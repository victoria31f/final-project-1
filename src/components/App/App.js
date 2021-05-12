import './App.css';
import {
    Switch,
    Route,
} from "react-router-dom";

import Menu from "../Menu";
import CaughtPokemonsPage from '../CaughtPokemonsPage';
import React from 'react';
import PokemonPage from '../PokemonPage';
import AllPokemonsPage from '../AllPokemonsPage';

const App = () => {

    return (
        <div className="bg-light">
            <Menu />
            <div className="container-lg bg-light content py-5">
                <Switch>
                    <Route exact path='/' component={AllPokemonsPage} />
                    <Route path='/pokemons/:id' component={PokemonPage} />
                    <Route path='/pokemons-caught' component={CaughtPokemonsPage}/>
                </Switch>
            </div>
        </div>
    );
};

export default App;