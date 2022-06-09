import Card from "../Card/Card";

import './Cards.scss'

export default function Cards({ pokemons }) {
  const cards = pokemons.map((pokemon, index) => {
    return <Card key={index} name={pokemon.name} tipo={pokemon.tipo} imagen={pokemon.imagen} />
  });
  return (
    <div className="cards">
      {cards}
    </div>
  );
}