import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Components/Login/Login';
import SignUp from './Components/Register/Register';
import UserDetails from './Components/UserDetails/UserDetails';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
     
    
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path='/userdetails' component={UserDetails} />
          
          
     
    </div>
    </Router>
  );
}

export default App;
