import { useEffect, useState } from 'react';
import FormSearch from '../../components/FormSearch/FormSearch';
import Cards from "../../components/Cards/Cards";
import Ordenar from '../../components/Ordenar/Ordenar';
import Filtro from '../../components/Filtro/Filtro';
import Spinner from '../../components/Spinner/Spinner';
import Alert from '../../components/Alert/Alert';
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTipos } from '../../Reducer/actions';
import axios from "axios";

import './Home.scss'

export default function Home(props) {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemonsLoaded);
  const [pokemones, setPokemones] = useState([]);
  const [alert, setAlert] = useState({ Loading: false, Alert: '' });

  async function get(url) {
    try {
      const poke = await axios.get(url).catch(e => {
        console.log(e.message)
      });
      if (poke) {
        return poke.data;
      } else {
        return undefined;
      }
    } catch (error) {
      console.log('Error: ' + error)
    }
  }

  const Carga = async () => {
    setAlert({ ...alert, Loading: true });
    const pokemons = await get('http://localhost:3001/pokemons');
    const tipos = await get('http://localhost:3001/types');
    if (pokemons && tipos) {
      dispatch(getPokemons(pokemons));
      dispatch(getTipos(tipos));
      setAlert({ ...alert, Loading: false });
      console.log('Cargados')
    } else {
      setAlert({
        Alert: <Alert message={'Error en conexion con el servidor'} type={'danger'} />,
        Loading: false
      });
    }
  }

  const onClick = (orden) => {
    const pok = pokemones.slice();
    if (orden === 'Ascendente') {
      console.log(orden);
      const asc = pok.sort((a, b) => {
        if (a.nombre > b.nombre) {
          return 1;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        return 0;
      });
      setPokemones(asc);
    } else if (orden === 'Descendente') {
      console.log(orden);
      const desc = pok.sort((a, b) => {
        if (a.nombre < b.nombre) {
          return 1;
        }
        if (a.nombre > b.nombre) {
          return -1;
        }
        return 0;
      })
      setPokemones(desc);
    } else if (orden === 'Mayor') {
      console.log(orden)
      const mayor = pok.sort((a, b) => {
        if (a.fuerza < b.fuerza) {
          return 1;
        }
        if (a.fuerza > b.fuerza) {
          return -1;
        }
        return 0;
      })
      setPokemones(mayor)
    } else if (orden === 'Menor') {
      const menor = pok.sort((a, b) => {
        if (a.fuerza > b.fuerza) {
          return 1;
        }
        if (a.fuerza < b.fuerza) {
          return -1;
        }
        return 0;
      })
      setPokemones(menor)
      console.log(orden)
    }
  };

  const onClickFiltro = (creados, tipo) => {
    const pok = pokemons.slice();
    if (creados && tipo === 'Todos') {
      const filtro = pok.filter((p) => {
        if (p.id[0] === '0') {
          return p;
        }
      });
      setPokemones(filtro);
      if (filtro.length === 0) {
        setAlert({
          ...alert,
          Alert: <Alert message={'No se encontraron Pokemons de tipo: ' + tipo} type={'warning'} />
        });
      } else {
        setAlert({
          ...alert,
          Alert: ''
        });
      }
    } else if (!creados && tipo === 'Todos') {
      setPokemones(pok);
    } else if (creados && tipo !== 'Todos') {
      const filtro = pok.filter((p) => {
        if (p.id[0] === '0') {
          let tip = p.tipos.filter(t => t.nombre === tipo);
          if (tip.length > 0) {
            return p;
          }
        }
      });
      setPokemones(filtro);
      if (filtro.length === 0) {
        setAlert({
          ...alert,
          Alert: <Alert message={'No se encontraron Pokemons de tipo: ' + tipo} type={'warning'} />
        });
      } else {
        setAlert({
          ...alert,
          Alert: ''
        });
      }
    } else if (!creados && tipo !== 'Todos') {
      const filtro = pok.filter((p) => {
        const tip = p.tipos.filter(t => { return t.nombre ? t.nombre === tipo : t === tipo });
        if (tip.length > 0) {
          return p;
        }
      });
      setPokemones(filtro);
      if (filtro.length === 0) {
        setAlert({
          ...alert,
          Alert: <Alert message={'No se encontraron Pokemons de tipo: ' + tipo} type={'warning'} />
        });
      } else {
        setAlert({
          ...alert,
          Alert: ''
        });
      }
    }
  }

  const onClickSearch = async (name) => {
    const search = await get(`http://localhost:3001/pokemons?name=${name}`);
    if (search) {
      setPokemones([search]);
    } else {
      console.log('Pokemon no Encontrado')
      setAlert({ 
        ...alert,
         Alert: <Alert message={'No se encontraro el Pokemon: ' + name } type={'warning'} />  
        });
    }
  }

  useEffect(() => {
    setPokemones(pokemons);
    if (pokemons.length === 0) {
      console.log('Cargando Pokemons');
      Carga();
    }
  }, []);

  useEffect(() => {
    setPokemones(pokemons);
  }, [pokemons]);

  return (
    <div className="Home">
      <FormSearch onClick={onClickSearch} />
      <div className='Opcions'>
        <Filtro onClick={onClickFiltro} />
        <Ordenar title={['Nombre', 'Fuerza']} options={['Ascendente', 'Descendente', 'Mayor', 'Menor']} onClick={onClick} />
      </div>
      {
        alert.Loading ? <Spinner /> : null
      }
      {
        alert.Alert ?
          <div className='Alerta'>
            {alert.Alert}
            {/* <Alert message={'No se encontraron Pokemons'} type={'warning'} /> */}
          </div>
          : <Cards pokemons={pokemones} />
      }
    </div>
  );
}