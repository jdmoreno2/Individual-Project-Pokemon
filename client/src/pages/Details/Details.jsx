import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPokemosDetails } from '../../Reducer/actions';
import './Details.scss';

export default function Details(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  async function get(url) {
    try {
      const poke = await axios.get(url);
      return poke.data;
    } catch (error) {
      console.log('Error: ' + error)
    }
  }

  const carga = async () => {
    dispatch(getPokemosDetails(await get(`http://localhost:3001/pokemons/${id}`)));
  }

  const { altura, defensa, fuerza, imagen, nombre, peso, tipos, velocidad, vida } = useSelector((state) => state.pokemonDetail);

  useEffect(() => {
    carga();
  }, [])
  
  const tipo = tipos ? tipos.map(tip => { return tip.nombre ?  tip.nombre + " " : tip + ' '}) : null;
  return (
    <div className='Details'>
      <div id="container">
        <div className="pokemon-details">
          <h1>{nombre}</h1>
          <div className="info.">
            <h2>Estadísticas</h2>
            <ul>
              <li><strong>Altura: </strong>{altura} </li>
              <li><strong>Defensa: </strong>{defensa} </li>
              <li><strong>Fuerza: </strong>{fuerza} </li>
              <li><strong>Peso: </strong>{peso} </li>
              <li><strong>Velocidad: </strong>{velocidad} </li>
              <li><strong>Vida: </strong>{vida} </li>
              <li><strong>Tipo: </strong>{tipo} </li>
            </ul>
          </div>
        </div>
        <div className="pokemon-image">
          <img src={imagen} alt={nombre} />
        </div>
      </div>
    </div>
  );
}