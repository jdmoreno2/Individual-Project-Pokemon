import { Link } from 'react-router-dom';
import './Card.css';

export default function Card(props) {
  return(
    <div className="Card">
      <h1>App Pokemons</h1>
      <Link to='/home' style={{textDecoration: 'none'}}>
      <a href="#" class="btn-home" alt="Home"></a>
      </Link>
    </div>
  );
}