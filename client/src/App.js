import './App.css';
import { Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Home from './pages/Home/Home'
import Details from './pages/Details/Details'
import Create from './pages/Create/Create'
import Nav from './components/Nav/Nav'

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/home'>
        <Nav />
        <Home />
      </Route>
      <Route exact path='/create'>
        <Nav />
        <Create />
      </Route>
      <Route exact path='/details'>
        <Nav />
        <Details />
      </Route>
    </Switch>
  );
}

export default App;
