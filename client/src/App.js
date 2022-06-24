import { Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Home from './pages/Home/Home'
import Details from './pages/Details/Details'
import Create from './pages/Create/Create'
import Nav from './components/Nav/Nav'
import { useDispatch } from 'react-redux';
import { getPokemons, getTipos } from './Reducer/actions';
import axios from 'axios';

import './App.css';

function App() {
  const dispatch = useDispatch();

  async function get(url) {
    const poke = await axios.get(url);
    return poke.data;
  }

  const Carga = async () => {
    dispatch(getPokemons(await get('http://localhost:3001/pokemons')));
    dispatch(getTipos(await get('http://localhost:3001/types')));
  }

  Carga();

  return (
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/home'>
        <Nav />
        <Home />
      </Route>
      <Route exact path='/create'>
        <Nav />
        <Create />
      </Route>
      <Route exact path='/details/:id' >
        <Nav />
        <Details />
      </Route>
    </Switch>
  );
}

export default App;
