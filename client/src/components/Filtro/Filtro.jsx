import { useState } from 'react';
import { useSelector } from 'react-redux';

import './Filtro.scss'

export default function Filtro({ onClick }) {
  const tipos = useSelector((state) => state.tipos);
  const [selected, setSelected] = useState({
    checkbox: false,
    select: 'Todos'
  });
  const onChange = (e) => {
    let opcion = e.target.name;
    if (opcion === 'Creados') {
      if (selected.checkbox === false) {
        setSelected({
          ...selected,
          checkbox: true
        })
        onClick(true, selected.select);
      } else if (selected.checkbox === true){
        setSelected({
          ...selected,
          checkbox: false
        })
        onClick(false, selected.select);
      }
    }else{
      let value = e.target.value;
      setSelected({
        ...selected,
        select: value
      });
      onClick(selected.checkbox, value);
    }
  }
  return (
    <div className='Filtro'>
      <h3>Filtrar Por:</h3>
      <div className='Titulos'>
        <h4 className='titulo'>Pokemons</h4>
        <input type="checkbox" name="Creados" id="Creados" onChange={onChange} defaultChecked={selected.checkbox} />
        <label htmlFor="Creados" >Creados/Existente</label>
      </div>
      <div className='Titulos'>
        <h4 className='titulo'>Tipo</h4>
        <select name="Tipo" id="Tipo" className='select' onChange={onChange}>
          <option value='Todos'>Todos</option>
          {
            tipos.map(tipo => {
              return <option key={tipo.id} className='Opcion' value={tipo.nombre}>{tipo.nombre}</option>
            })
          }
        </select>
      </div>
    </div>
  );
}