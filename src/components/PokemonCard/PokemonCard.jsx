import './PokemonCard.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { capitalize } from '../../utils';
import { editPokemon } from '../PokemonsList/PokemonsListSlice';

const PokemonCard = ({
  name, caught, id, path,
}) => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    const date = Date.now();
    dispatch(editPokemon({ id, caught: !caught, date }));
  };

  const buttonLetGo = 'Let go';
  const buttonCatch = caught ? 'Caught' : 'Catch';
  const button = (path === '/pokemons-caught') ? buttonLetGo : buttonCatch;
  const disabled = (path === '/pokemons-caught') ? false : caught;

  return (
    <div className="card">
      <Link to={`/pokemons/${id}`}>
        <img src={`/img/${id}.png`} className="card-img-top" alt="" />
      </Link>
      <div className="card-body p-0 d-flex justify-content-center flex-column">
        <h5 className="card-title text-center">{capitalize(name)}</h5>
        <button
          type="button"
          className="btn btn-primary btn-sm btn-warning card-button fs-5 fw-bolder"
          disabled={disabled}
          onClick={clickHandler}
        >
          {button}
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
