import React, { Component } from 'react';
import Canvas from './components/Canvas'
import Sidebar from './components/Sidebar'
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <Canvas />
      </div>
    );
  }
}

export default App;
