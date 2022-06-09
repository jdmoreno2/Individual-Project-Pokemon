import { Link } from 'react-router-dom';
import './Presentacion.scss';

export default function Presentacion(props) {
  return(
    <div className="Presentacion">
      <h1>App Pokemons</h1>
      <Link to='/home' className="btn-home" alt="Home" />
    </div>
  );
}