import { Link } from 'react-router-dom';

import "./Card.scss";

export default function Card({key, name, tipo, imagen}) {
  return(
    <div className="Card" key={key}>
      <div className='Card_marco' >
        <img src={imagen} alt="Poster" className='Card_imagen' />
      </div>
      <div className='Card_body'>
        <div className="Content">
          <h2 className='Card_titulo'>
            <Link to={`/movie/${'datos.imdbID'}`}>
              {name}
            </Link>
          </h2>
          <p><strong>Tipo:</strong>  {tipo.map( tip => tip + " ")}</p>
        </div>
      </div>
    </div>
  );
}