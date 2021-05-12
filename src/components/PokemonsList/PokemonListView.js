import './PokemonsList.css';
import React from 'react';

import Pokemon from '../Pokemon';
import Spinner from '../Spinner';

const PokemonListView = ({   status, pokemonsList, pokemonsListError,
                             loadMoreHandler, pokemonsStatus }) => {

    const spinner = <div className="spinner-border spinner-inline" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>;

    const pokemons = <div className="list mx-5">
            { pokemonsList.map((item, idx) => {
                const { name, caught, id } = item;
                return <Pokemon name={name}
                                caught={caught ? caught : false}
                                id={id}
                                key={idx} />;
            })}
        </div>;

    return (
        <div>
            { status === 'loading' && <Spinner/> }
            { status === 'succeeded' && pokemons }
            { status === 'failed' &&  <div>{pokemonsListError}</div>}
            <button type="button" className="btn btn-primary btn-lg button"
                    onClick={loadMoreHandler} >
                { pokemonsStatus === 'loading' && status !== 'loading' ? spinner : 'Load more'}
            </button>
        </div>
    );
}

export default PokemonListView;