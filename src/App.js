import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PokemonList } from "./components/Container/Container";
import { PokemonDetail } from "./components/Details/Details";
import './App.css';

const NoMatchRoute = () => <div>404 Page</div>;

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={PokemonList} />
        <Route path="/pokemon/:pokemonId" exact component={PokemonDetail} />
        <Route component={NoMatchRoute} />
      </Switch>
    </Router>
  );
}

export default App;
