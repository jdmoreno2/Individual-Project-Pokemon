import { useState } from "react";
import "./FormSearch.scss";

export default function FormSearch({ onClick }) {

  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const valida = function (input) {
    if (!input) {
      setError('Ingrese el nombre del Pokemon');
    } else if (!/[a-zA-Z]+/.test(input)) {
      setError('¡No se permiten numeros ni simbolos!');
    } else {
      setError('');
      setSearch(input);
    }
  }


  const onClick1 = (event) => {
    event.preventDefault();
    const value = event.target.search.value
    valida(value);
    if (error === '' && search !== '') {
      onClick(value);
    }
  }

  return (
    <div className="cover">
      <h1>App Mi Pokemon</h1>
      <form className="flex-form" onSubmit={onClick1}>
        <input type="search" placeholder="Que pokemon quieres buscar?" name="search" value={search} onChange={(e) => valida(e.target.value)} />
        <input type="submit" value="Buscar" />
      </form>
      {
        !error ? null : <p className="Error">
          {error}
        </p>
      }
    </div>
  );
}