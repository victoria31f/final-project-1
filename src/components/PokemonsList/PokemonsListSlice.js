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
};

export const fetchPokemons = createAsyncThunk(
  'pokemonsList/fetchPokemons',
  (data, thunkAPI) => apiService.getAllPokemons(data, thunkAPI.getState().pokemonsList.startPoint),
);

export const fetchCaughtPokemons = createAsyncThunk(
  'pokemonsList/fetchCaughtPokemons',
  () => apiService.getCaughtPokemons(),
);

export const editPokemon = createAsyncThunk(
  'pokemonsList/editPokemon',
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
        if (!pokemon.caught) {
          const pokemonCaughtIdx = state.pokemonsCaught.findIndex((el) => el.id === id);
          state.pokemonsCaught.splice(pokemonCaughtIdx, 1);
        }
      }
    },
    [fetchCaughtPokemons.fulfilled]: (state, action) => {
      state.statusCaught = 'succeeded';
      state.pokemonsCaught = [...action.payload];
    },
  },
});

export default pokemonsListSlice.reducer;

export const selectAllPokemons = (state) => state.pokemonsList.pokemons;
export const selectPokemonsCaught = (state) => state.pokemonsList.pokemonsCaught;
