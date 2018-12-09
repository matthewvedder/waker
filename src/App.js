import React, { Component } from 'react';
import Canvas from './components/Canvas'
import LoginForm from './components/LoginForm'
import Sidebar from './components/Sidebar'
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <LoginForm />
      </div>
    );
  }
}

export default App;
