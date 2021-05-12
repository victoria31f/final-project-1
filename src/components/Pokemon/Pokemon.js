import './Pokemon.css';
import { Link } from 'react-router-dom';
import { capitalize } from '../../utils';
import { useDispatch } from 'react-redux';
import { editPokemon } from '../PokemonsList/PokemonsListSlice';

const Pokemon = ({ name, caught, id }) => {

    const dispatch = useDispatch();

    const clickHandler = () => {
        const date = Date.now();
        dispatch(editPokemon({ id, caught: !caught, date }));
    }

    return (
        <div className="card">
            <Link to={`/pokemons/${id}`}>
                <img src={`${process.env.PUBLIC_URL}/img/${id}.png`} className="card-img-top" alt="" />
            </Link>
            <div className="card-body p-0 d-flex justify-content-center flex-column">
                <h5 className="card-title text-center">{capitalize(name)}</h5>
                <button type="button"
                        className="btn btn-primary btn-sm btn-warning card-button fs-5 fw-bolder"
                        disabled={caught}
                        onClick={clickHandler} >
                    {caught ? 'Caught' : 'Catch'}
                </button>
            </div>
        </div>
    );
};

export default Pokemon;