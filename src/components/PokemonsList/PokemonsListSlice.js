/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/Api';

const initialState = {
  pokemons: [],
  pokemonsCaught: [],
  statusAll: 'idle',
  statusCaught: 'idle',
  error: null,
  startPoint: 0,
  limit: 15,
  buttonLoadVisible: true,
  buttonCaughtLoadVisible: true,
  startPointCaught: 0,
};

export const fetchPokemons = createAsyncThunk(
  'pokemonsList/fetchPokemons',
  (data, thunkAPI) => apiService.getAllPokemons(data, thunkAPI.getState().pokemonsList.startPoint),
);

export const fetchCaughtPokemons = createAsyncThunk(
  'pokemonsList/fetchCaughtPokemons',
  // eslint-disable-next-line max-len
  (data, thunkAPI) => apiService.getCaughtPokemons(data, thunkAPI.getState().pokemonsList.startPointCaught),
);

export const editPokemon = createAsyncThunk(
  'pokemonsList/editPokemon',
  (data) => apiService.editPokemon(data),
);

export const letPokemonGo = createAsyncThunk(
  'pokemonsList/letPokemonGo',
  (data) => apiService.editPokemon(data),
);

export const pokemonsListSlice = createSlice({
  name: 'pokemonsList',
  initialState,
  reducers: {
    pokemonsAdded: (state, action) => {
      state.pokemons.concat(action.payload);
    },
  },
  extraReducers: {
    [fetchPokemons.pending]: (state) => {
      state.statusAll = 'loading';
    },
    [fetchPokemons.fulfilled]: (state, action) => {
      state.statusAll = 'succeeded';
      if (action.payload.length > 0) {
        state.pokemons.push(...action.payload);
        state.startPoint += state.limit;
        if (action.payload.length < 15) {
          state.buttonLoadVisible = false;
        }
      }
    },
    [fetchPokemons.rejected]: (state, action) => {
      state.statusAll = 'failed';
      state.error = action.error.message;
    },
    [editPokemon.fulfilled]: (state, action) => {
      const { id, name, caught } = action.payload;
      const pokemon = state.pokemons.find((el) => el.id === id);
      if (pokemon) {
        pokemon.name = name;
        pokemon.caught = caught;
        if (pokemon.caught) {
          state.pokemonsCaught.push(pokemon);
        }
      }
    },
    [letPokemonGo.fulfilled]: (state, action) => {
      const { id, caught } = action.payload;
      let index;
      const pokemonCaught = state.pokemonsCaught.find((el, idx) => {
        index = idx;
        return el.id === id;
      });
      const pokemon = state.pokemons.find((el) => el.id === id);
      if (pokemonCaught) {
        pokemonCaught.caught = caught;
        if (!pokemonCaught.caught) {
          state.pokemonsCaught.splice(index, 1);
          if (pokemon) {
            pokemon.caught = caught;
          }
        }
      }
    },
    [fetchCaughtPokemons.fulfilled]: (state, action) => {
      state.statusCaught = 'succeeded';
      // state.pokemonsCaught = [...action.payload];
      if (action.payload.length > 0) {
        state.pokemonsCaught.push(...action.payload);
        state.startPointCaught += state.limit;
        if (action.payload.length < 15) {
          state.buttonCaughtLoadVisible = false;
        }
      }
    },
  },
});

export default pokemonsListSlice.reducer;

export const selectAllPokemons = (state) => state.pokemonsList.pokemons;
export const selectPokemonsCaught = (state) => state.pokemonsList.pokemonsCaught;
