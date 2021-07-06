
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './screens/Login'
import Signin from './screens/Signin'
import Navigation from './components/Navigation';
import Home from './screens/Home'
import Error from './screens/Error'

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Signin}/>
        <Route path='/:someString' component={Error} />
      </Switch>
    </Router>
    
  );
}

export default App;
