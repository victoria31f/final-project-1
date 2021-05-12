import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCaughtPokemons, fetchPokemons, selectAllPokemons, selectPokemonsCaught } from './PokemonsListSlice';

import PokemonListView from './PokemonListView';

const PokemonsList = ({ match }) => {

    const { path } = match;
    const dispatch = useDispatch();

    const pokemonsListAll = useSelector(selectAllPokemons);
    const pokemonsListCaught = useSelector(selectPokemonsCaught);
    const pokemonsList = (path === '/') ? pokemonsListAll : pokemonsListCaught;

    const pokemonsAllStatus = useSelector(state => state.pokemonsList.statusAll);
    const pokemonsCaughtStatus = useSelector(state => state.pokemonsList.statusCaught);
    const pokemonsStatus = (path === '/') ? pokemonsAllStatus : pokemonsCaughtStatus;

    const pokemonsListError = useSelector(state => state.pokemonsList.error);

    const limit = 15;
    const startPoint = useSelector(state => state.pokemonsList.startPoint);

    useEffect(() => {
        if(path === '/' && pokemonsAllStatus === 'idle') {
            dispatch(fetchPokemons({ limit }));
        }
    }, [ pokemonsAllStatus, dispatch, path]);

    useEffect(() => {
        if(path === '/pokemons-caught' && (pokemonsCaughtStatus === 'idle')) {
            dispatch(fetchCaughtPokemons());
        }
    }, [ pokemonsCaughtStatus, dispatch, path ]);

    const loadMoreHandler = () => {
        dispatch(fetchPokemons({ limit }));
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

export default PokemonsList;