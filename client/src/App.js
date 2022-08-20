import { Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Home from './pages/Home/Home'
import Details from './pages/Details/Details'
import Create from './pages/Create/Create'
import Nav from './components/Nav/Nav'
import NotFound from './pages/Not Found/NoFound'
import { useDispatch } from 'react-redux';
import { getPokemons, getTipos } from './Reducer/actions';
import axios from 'axios';
const { POKEMONS_URL_API } = import.meta.env;

import './App.css';

function App() {
  const dispatch = useDispatch();

  async function get(url) {
    const poke = await axios.get(url).catch(e => {
      console.log(e.message)
    });
    if (poke) {
      return poke.data;
    }else{
      return undefined;
    }
  }

  const Carga = async () => {
    const pokemons = await get(POKEMONS_URL_API+'/pokemons');
    const tipos = await get(POKEMONS_URL_API+'/types');
    if (pokemons && tipos) {
      dispatch(getPokemons(pokemons));
      dispatch(getTipos(tipos));
    }
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
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
