import { useEffect } from 'react';
import FormSearch from '../../components/FormSearch/FormSearch';
import Cards from "../../components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTipos } from '../../Reducer/actions';
import axios from "axios";

import './Home.scss'

export default function Home(props) {
  const dispatch = useDispatch();  
  const pokemons = useSelector((state) => state.pokemonsLoaded);
  async function get(url) {
    const poke = await axios.get(url);
    return poke.data;
  }
  
  useEffect(() => {
    if (pokemons.length === 0) {
      console.log('Cargando Pokemons')
      const a = async () =>{
        dispatch(getPokemons(await get('http://localhost:3001/pokemons')));
      }
      a();
    }
  }, []);

  return (
    <div className="Home">
      <FormSearch />
      <Cards pokemons={pokemons} />
    </div>
  );
}