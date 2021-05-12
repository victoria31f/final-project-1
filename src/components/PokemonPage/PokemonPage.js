import './PokemonPage.css';
import { useEffect, useState } from 'react';
import { apiService } from '../../services/Api';
import PokemonPageView from './PokemonPageView';

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
        <PokemonPageView id={pokemon.id}
                         name={pokemon.name}
                         caught={pokemon.caught}
                         date={pokemon.date} />
    );
};

export default PokemonPage;