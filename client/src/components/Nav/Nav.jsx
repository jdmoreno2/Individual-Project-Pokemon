import { Link } from 'react-router-dom';
import './Nav.scss'

export default function Nav(props) {
  return (
    <header >
      <nav className='NavBar'>
        <Link to='/home' className='Logo'>
          <h2>
            App Pokemon
          </h2>
        </Link>
        <ul>
          <li>
            <Link to='/home' className="Links" >
              Inicio
            </Link>
          </li>
          <li >
            <Link to='/create' className="Links">
              Crear Pokemon
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}