import { useDispatch, useSelector } from 'react-redux';
import PokemonListView from '../PokemonsList';
import React, { useEffect } from 'react';
import { fetchPokemons, selectAllPokemons } from '../PokemonsList/PokemonsListSlice';

const AllPokemonsPage = () => {
    const dispatch = useDispatch();

    const pokemonsStatus = useSelector(state => state.pokemonsList.statusAll);
    const pokemonsList = useSelector(selectAllPokemons);
    const pokemonsListError = useSelector(state => state.pokemonsList.error);

    const limit = 15;
    const startPoint = useSelector(state => state.pokemonsList.startPoint);

    useEffect(() => {
        if(pokemonsStatus === 'idle') {
            dispatch(fetchPokemons({ limit }));
        }
    }, [ pokemonsStatus, dispatch ]);

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

export default AllPokemonsPage;