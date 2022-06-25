import { useState } from 'react';
import { useSelector } from 'react-redux';
import Alert from '../Alert/Alert';
import './FormCreate.scss'


export default function Form({ onSubmit }) {
  const tipos = useSelector((state) => state.tipos);
  const [input, setInput] = useState({
    nombre: '',
    vida: '',
    fuerza: '',
    defensa: '',
    velocidad: '',
    altura: '',
    peso: '',
    tipo: [],
    imagen: ''
  });
  const [errors, setErrors] = useState({
    nombre: '',
    vida: '',
    fuerza: '',
    defensa: '',
    velocidad: '',
    altura: '',
    peso: '',
    tipo: '',
    imagen: ''
  });
  const [alert, setAlert] = useState('');

  function validate(input, e) {
    let error = errors;
    if (e === 'nombre') {
      if (!input[e]) {
        error[e] = '¡Se requiere Nombre!';
      } else if (!/[a-zA-Z]+$/.test(input[e])) {
        error[e] = '¡Nombre invalido!';
      } else {
        error[e] = '';
      }
    } else {
      if (!input[e]) {
        error[e] = 'Se requiere ' + e;
      } else if (!/^[0-9]+$/.test(input[e])) {
        error[e] = 'Solo se permiten numeros';
      } else if (input[e] > 200) {
        error[e] = 'El valor ingresado no debe ser mayor a 200';
      } else {
        error[e] = '';
      }
    }
    return error;
  };

  const handleErrors = function (e) {
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }, e.target.name));
    if (errors[e.target.name] === '') return true
    return false
  }

  const onHandledChange = (e) => {
    const campo = e.target.name;
    const value = e.target.value;
    if (campo === 'tipo') {
      setInput({
        ...input,
        tipo: input.tipo.find(t => t === parseInt(value)) ? input.tipo.filter(t => t !== parseInt(value)) : input.tipo.concat(parseInt(value))
      });
    } else if (campo === 'imagen') {
      console.log()
      setInput({
        ...input,
        [campo]: e.target.files[0]
      });
    } else {
      handleErrors(e)
      setInput({
        ...input,
        [campo]: value
      });
    }
  }

  const onSubmit2 = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setAlert('Hola');
    console.log(alert)
    console.log('Aqui')
    const { nombre, vida, fuerza, defensa, velocidad, altura, peso, tipo, imagen } = input;
    if (nombre !== '' && vida !== '' && fuerza !== '' && defensa !== ''
      && velocidad !== '' && altura !== '' && peso !== '' && tipo.length != 0 && imagen !== '') {
        if (onSubmit(formData)) {
          setAlert(<Alert message={'Pokemon Creado'} type={'success'} />)
          setInput({
            nombre: '',
            vida: '',
            fuerza: '',
            defensa: '',
            velocidad: '',
            altura: '',
            peso: '',
            tipo: '',
            imagen: ''
          });
          e.target.reset();
        } else {
          setAlert(<Alert message={'Error no se pudo crear el pokemon'} type={'dangerous'} />)
        }
    }else{
      setAlert(<Alert message={'Se deben llenar todos los campos'} type={'warning'} />)
    }
  }

  return (
    <div className="CreatePokemon">
      <h1>Crear Pokemon</h1>
      {
        alert
      }
      <form onSubmit={(e) => onSubmit2(e)} encType='multipart/form-data' name='create'>
        <div className='input'>
          <input type="text" name="nombre" placeholder='Ingrese Nombre' value={input.nombre} onChange={(e) => onHandledChange(e)} />
          <small>{errors.nombre}</small>
        </div>
        <div className='input'>
          <input type="number" name="vida" placeholder='Ingrese Vida' value={input.vida} onChange={(e) => onHandledChange(e)} />
          <small>{errors.vida}</small>
        </div>
        <div className='input'>
          <input type="number" name="fuerza" placeholder='Ingrese Fuerza' value={input.fuerza} onChange={(e) => onHandledChange(e)} />
          <small>{errors.fuerza}</small>
        </div>
        <div className='input'>
          <input type="number" name="defensa" placeholder='Ingrese Defenza' value={input.defensa} onChange={(e) => onHandledChange(e)} />
          <small>{errors.defensa}</small>
        </div>
        <div className='input'>
          <input type="number" name="velocidad" placeholder='Ingrese Velocidad' value={input.velocidad} onChange={(e) => onHandledChange(e)} />
          <small>{errors.velocidad}</small>
        </div>
        <div className='input'>
          <input type="number" name="altura" placeholder='Ingrese Altura' value={input.altura} onChange={(e) => onHandledChange(e)} />
          <small>{errors.altura}</small>
        </div>
        <div className='input'>
          <input type="number" name="peso" placeholder='Ingrese Peso' value={input.peso} onChange={(e) => onHandledChange(e)} />
          <small>{errors.peso}</small>
        </div>
        <div className='input'>
          <input type="file" name="imagen" placeholder='Ingrese imagen' onChange={(e) => onHandledChange(e)} />
          <small>{errors.imagen}</small>
        </div>
        <div className='input'>
          <select name="tipo" id="tipo" placeholder='Seleccione Tipo' value={input.tipo} onChange={(e) => onHandledChange(e)} multiple >
            {
              tipos.map(tipo => {
                return <option key={tipo.id} className='Opcion' value={tipo.id}>{tipo.nombre}</option>
              })
            }
          </select>
          <small>{errors.tipo}</small>
        </div>
        <div>
          <button>Crear</button>
        </div>
      </form>
    </div>
  );
}