import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCaughtPokemons,
    selectPokemonsCaught,
} from '../PokemonsList/PokemonsListSlice';
import React, { useEffect } from 'react';
import PokemonListView from '../PokemonsList';

const CaughtPokemonsPage = () => {

    const dispatch = useDispatch();

    const pokemonsList = useSelector(selectPokemonsCaught);
    const pokemonsStatus = useSelector(state => state.pokemonsList.statusCaught);

    const pokemonsListError = useSelector(state => state.pokemonsList.error);

    const startPoint = useSelector(state => state.pokemonsList.startPoint);

    useEffect(() => {
        if(pokemonsStatus === 'idle') {
            dispatch(fetchCaughtPokemons());
        }
    }, [ pokemonsStatus, dispatch ]);

    const loadMoreHandler = () => {
        dispatch(fetchCaughtPokemons());
    };

    let status;
    if(startPoint === 0 && pokemonsStatus === 'loading') {
        status = 'loading';
    } else if(pokemonsStatus === 'succeeded' || (startPoint > 0 && 'loading')) {
        status = 'succeeded';
    } else if(pokemonsStatus === 'failed') {
        status = 'failed';
    }

    return (
        <PokemonListView pokemonsList={pokemonsList}
                         status={status}
                         pokemonsStatus={pokemonsStatus}
                         loadMoreHandler={loadMoreHandler}
                         pokemonsListError={pokemonsListError} />
    );
};

export default CaughtPokemonsPage;