import './PokemonPage.css';
import { useEffect, useState } from 'react';
import { apiService } from '../../services/Api';

const PokemonPage = ({ match }) => {
    const { id } = match.params;
    const [pokemon, setPokemon] = useState({
        id,
        name: '',
        caught: '',
        date: '',
    });

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        apiService.getPokemon(id, { signal })
            .then(data => {
                setPokemon(data);
            })
            .catch(err => {
                console.error(err);
            });
        return () => {
            controller.abort();
        }
    }, [id]);

    return (
        <div className="card mb-3 pokemon-card">
            <div className="row g-0">
                <div className="col-md-6">
                    <img src={`${process.env.PUBLIC_URL}/img/${id}.png`} alt={pokemon.name} className="pokemon-img" />
                </div>
                <div className="col-md-6">
                    <div className="card-body text-end">
                        <h5 className="card-title fs-2">{`${pokemon.id} - ${pokemon.name.toUpperCase()}`}</h5>
                        <p className="card-text fs-3">{
                            pokemon.caught
                                ? `This pokemon was caught on ${pokemon.date}`
                                : `This pokemon hasn't been caught yet` }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonPage;