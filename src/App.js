import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import PrivateRoute from './components/PrivateRoute'
import Canvas from './components/Canvas'
import LoginForm from './components/LoginForm'
import Sidebar from './components/Sidebar'
import { isAuthenticated } from './Auth'
import './styles/App.css';

class App extends Component {
  render() {
      console.log(isAuthenticated())
    return (
      <Router>
        <div className="App">
          <Sidebar />
          <PrivateRoute path="/" exact component={Canvas} />
          <Route path="/login" component={LoginForm} />
        </div>
      </Router>
    );
  }
}

export default App;
