import './App.css';
import { Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Home from './pages/Home/Home'
import Details from './pages/Details/Details'
import Create from './pages/Create/Create'

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/home' component={Home}/>
      <Route exact path='/create' component={Create}/>
      <Route exact path='/details' component={Details}/>
    </Switch>
  );
}

export default App;
