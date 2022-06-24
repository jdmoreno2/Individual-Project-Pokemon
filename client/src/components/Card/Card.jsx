import { Link } from 'react-router-dom';

import "./Card.scss";

export default function Card({ id, nombre, tipos, imagen, fuerza }) {
  return (
    <div className="Card">
      <div className='Card_marco' >
        <img src={imagen} alt="Poster" className='Card_imagen' />
      </div>
      <div className="Card_content">
        <h3 className="Card_title" >
          <Link to={`/details/${id}`}>
            {nombre}
          </Link>
        </h3>
        <span className="Card_subtitle">
          Fuerza: {fuerza}
        </span>
        <p className="Card_description">
        <strong>Tipo:</strong>  {tipos.map(tip => { return tip.nombre ?  tip.nombre + " " : tip + ' '})}
        </p>
      </div>
    </div>

    // <div className="Card">
    //   <div className='Card_marco' >
    //     <img src={imagen} alt="Poster" className='Card_imagen' />
    //   </div>
    //   <div className='Card_body'>
    //     <div className="Content">
    //       <h2 className='Card_titulo'>
    //         <Link to={`/details/${id}`}>
    //           {nombre}
    //         </Link>
    //       </h2>
    //       <p><strong>Fuerza: {fuerza}</strong></p>
    //       <p><strong>Tipo:</strong>  {tipos.map(tip => { return tip.nombre ?  tip.nombre + " " : tip + ' '})}</p>
    //     </div>
    //   </div>
    // </div>
  );
}