import { useState } from "react";
import Card from "../Card/Card";
import Paginacions from "../Paginacion/Paginacion";

import './Cards.scss'

export default function Cards({ pokemons }) {
  const cards = pokemons;
  const [paginacion, setpaginacion] = useState({
    paginaActual: 1,
    pokemonsPorPagina: 12
  });
  const handleClick = (e) => {
    e.preventDefault();
    setpaginacion({
      ...paginacion,
      paginaActual: Number(e.target.id)
    });
  }
  const { paginaActual, pokemonsPorPagina } = paginacion;

  // Logic for displaying pokemons
  const indexOfLastPokemon = paginaActual * pokemonsPorPagina;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPorPagina;
  const pokemonsActuales = cards.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const renderPokemons = pokemonsActuales.map((pokemon) => {
    return <Card key={pokemon.id} id={pokemon.id} nombre={pokemon.nombre} tipos={pokemon.tipos} imagen={pokemon.imagen} fuerza={pokemon.fuerza} />
  });

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(cards.length / pokemonsPorPagina); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    if (number === paginaActual) {
      return (
        <li
          key={number}
          id={number}
          onClick={(e) => handleClick(e)}
          className='active'
        >
          {number}
        </li>
      );
    }
    return (
      <li
        key={number}
        id={number}
        onClick={(e) => handleClick(e)}
      >
        {number}
      </li>
    );
  });

  return (
    <div className="cards">
      <div className="card">
        {renderPokemons}
      </div>
      <Paginacions datos={renderPageNumbers} />
    </div>
  );
}