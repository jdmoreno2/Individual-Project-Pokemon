import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPokemosDetails } from '../../Reducer/actions';
import Alert from '../../components/Alert/Alert';
import Spinner from '../../components/Spinner/Spinner';
import './Details.scss';
require('dotenv').config()
const { POKEMONS_URL_API } = process.env.NODE_ENV;


export default function Details(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [alert, setAlert] = useState({ Loading: false, Alert: '' });

  async function get(url) {
    try {
      let error = '';
      const poke = await axios.get(url).catch(e => {
        console.log(e.message)
        error = e.message
      });
      if (poke) {
        return poke.data;
      } else {
        return error;
      };
    } catch (error) {
      console.log('Error: ' + error)
    }
  }

  const carga = async () => {
    setAlert({ ...alert, Loading: true });
    const pokemon = await get(`${POKEMONS_URL_API}/pokemons/${id}`);
    if (typeof pokemon === 'string') {
      if (pokemon.includes('404')) {
        setAlert({
          Alert: <Alert message={'El pokemon con id: ' + id + ' no se encuentra registrado'} type={'warning'} />,
          Loading: false
        });
      } else if (pokemon.includes('Network Error')) {
        setAlert({
          Alert: <Alert message={'Error en conexion con el servidor'} type={'danger'} />,
          Loading: false
        });
      }
    } else {
      dispatch(getPokemosDetails(pokemon));
      setAlert({ ...alert, Loading: false });
    }
  }

  const { altura, defensa, fuerza, imagen, nombre, peso, tipos, velocidad, vida } = useSelector((state) => state.pokemonDetail);

  useEffect(() => {
    carga();
  }, [])

  const tipo = tipos ? tipos.map(tip => { return tip.nombre ? tip.nombre + " " : tip + ' ' }) : null;
  return (
    <div className='Details'>
      {
        alert.Loading
          ?
          <div className='Alerta'><Spinner /></div>
          :
          alert.Alert ?
            <div className='Alerta'>
              {alert.Alert}
            </div>
            :
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
      }
    </div>
  );
}
