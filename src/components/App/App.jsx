import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import React from 'react';
import Menu from '../Menu';
import CaughtPokemonsPage from '../CaughtPokemonsPage';
import PokemonPage from '../PokemonPage';
import AllPokemonsPage from '../AllPokemonsPage';

const App = () => (
  <Router>
    <div className="bg-light">
      <Menu />
      <div className="container-lg bg-light content">
        <Switch>
          <Route exact path="/" component={AllPokemonsPage} />
          <Route path="/pokemons/:id" component={PokemonPage} />
          <Route path="/pokemons-caught" component={CaughtPokemonsPage} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
