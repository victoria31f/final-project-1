import './PokemonsList.css';
import React from 'react';

import PokemonCard from '../PokemonCard';
import Spinner from '../Spinner';

const PokemonListView = ({
  status, pokemonsList, pokemonsListError,
  loadMoreHandler, pokemonsStatus, path,
}) => {
  const spinner = (
    <div className="spinner-border spinner-inline" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  let pokemons = (
    <div className="list mx-5">
      { pokemonsList.map((item) => {
        const { name, caught, id } = item;
        return (
          <PokemonCard
            name={name}
            caught={caught || false}
            id={id}
            key={id}
            path={path}
          />
        );
      })}
    </div>
  );

  const warning = <p>Catch your first pokemon</p>;

  if (pokemonsList.length === 0) {
    pokemons = warning;
  }

  return (
    <div>
      { status === 'loading' && <Spinner /> }
      { status === 'succeeded' && pokemons }
      { status === 'failed' && <div>{pokemonsListError}</div>}
      <button
        type="button"
        className="btn btn-primary btn-lg button"
        onClick={loadMoreHandler}
      >
        { pokemonsStatus === 'loading' && status !== 'loading' ? spinner : 'Load more'}
      </button>
    </div>
  );
};

export default PokemonListView;
