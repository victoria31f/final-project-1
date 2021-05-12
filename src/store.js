import { configureStore } from '@reduxjs/toolkit';
import pokemonsListReducer from './components/PokemonsList/PokemonsListSlice';

export default configureStore({
    reducer: {
        pokemonsList: pokemonsListReducer,
    },
});