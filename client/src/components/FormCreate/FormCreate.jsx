import { useState } from 'react';
import './FormCreate.scss'

// function validate(input) {
//   let errors = {};
//   if (!input.nombre) {
//     errors.nombre = 'Se requiere Nombre';
//   } else if (!/\S+@\S+\.\S+/.test(input.nombre)) {
//     errors.nombre = 'Nombre invalido';
//   }
//   if (!input.vida) {
//     errors.vida = 'Se requiere Vida';
//   } else if (!/^[0-9]$/.test(input.vida)) {
//     errors.vida = 'Campo invalido';
//   }
//   return errors;
// };

function validate(input, e) {
  let errors = {};
  console.log(e)
  if (e === 'nombre') {
    if (!input[e]) {
      errors[e] = 'Se requiere Nombre';
    } else if (!/^\s+$/.test(input[e])) {
      errors[e] = 'Nombre invalido';
    }
  } else {
    if (!input[e]) {
      errors[e] = 'Se requiere ' + e;
    } else if (!/^\s+$/.test(input[e])) {
      errors[e] = 'Solo se permiten numeros';
    }
  }
  return errors;
};

export default function Form({ onSubmit }) {
  const [input, setInput] = useState({
    nombre: '',
    vida: '',
    fuerza: '',
    defensa: '',
    velocidad: '',
    altura: '',
    peso: '',
    tipo: ''
  });
  const [errors, setErrors] = useState({});

  const handleErrors = function (e) {
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }, e.target.name));
  }

  const onSubmit2 = (e) => {
    e.preventDefault();
    onSubmit(input);
    console.log(input);
  }
  const onHandledChange = (e) => {
    handleErrors(e);
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }
  return (
    <div className="CreatePokemon">
      <h1>Crear Pokemon</h1>
      <form onSubmit={(e) => onSubmit2(e)}>
        <input type="text" name="nombre" placeholder='Ingrese Nombre' value={input.nombre} onChange={(e) => onHandledChange(e)} />
        <small>{errors.nombre}</small>
        <input type="number" name="vida" placeholder='Ingrese Vida' value={input.vida} onChange={(e) => onHandledChange(e)} />
        <span>{errors.vida}</span>
        <input type="number" name="fuerza" placeholder='Ingrese Fuerza' value={input.fuerza} onChange={(e) => onHandledChange(e)} />
        <span>{errors.fuerza}</span>
        <input type="number" name="defensa" placeholder='Ingrese Defenza' value={input.defensa} onChange={(e) => onHandledChange(e)} />
        <span>{errors.defensa}</span>
        <input type="number" name="velocidad" placeholder='Ingrese Velocidad' value={input.velocidad} onChange={(e) => onHandledChange(e)} />
        <span>{errors.velocidad}</span>
        <input type="number" name="altura" placeholder='Ingrese Altura' value={input.altura} onChange={(e) => onHandledChange(e)} />
        <span>{errors.altura}</span>
        <input type="number" name="peso" placeholder='Ingrese Peso' value={input.peso} onChange={(e) => onHandledChange(e)} />
        <span>{errors.peso}</span>
        <select type="text" name="select" placeholder='Seleccione Tipo' value={input.tipo} onChange={(e) => onHandledChange(e)} multiple >

        </select>
        <span>{errors.tipo}</span>
        <div>
          <button>Crear</button>
        </div>
      </form>
    </div>
  );
}