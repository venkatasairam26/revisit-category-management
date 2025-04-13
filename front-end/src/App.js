import {BrowserRouter,Switch, Route} from 'react-router-dom'
import Login from './components/login'; 
import Signup from './components/signup';
import Home from "./components/home";
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/categories" component={Home} />
      <Route exact path="/signup" component={Signup} />
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
