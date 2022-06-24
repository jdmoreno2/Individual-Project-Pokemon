import { Fragment, useState } from 'react';
import './Ordenar.scss';

export default function Ordenar({ options, title, onClick }) {
  const [selected, setSelected] = useState({
    [title]: title
  });
  const onValueChange = (event) => {
    let value = event.target.value;
    setSelected({
      [title]: value
    });
    onClick(value);
  }
  return (
    <div className="options">
      <h3>Ordenar por:</h3>
      <div className='Titulos'>
        {
          title.map((p, index) => {
            return <h4 key={index} className='titulo'>{p}</h4>
          })
        }

      </div>
      {
        options.map((op, index) => (
          <Fragment key={index}>
            <input type="radio" id={op} value={op} checked={selected[title] === op} onChange={onValueChange} />
            <label htmlFor={op}>{op}</label>
          </Fragment>
        ))
      }
    </div>
  );
}