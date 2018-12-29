import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import PrivateRoute from './components/PrivateRoute'
import Canvas from './components/Canvas'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Sidebar from './components/Sidebar'
import { isAuthenticated } from './Auth'
import RootReducer from './reducers'
import RootSaga from './sagas'
import './styles/App.css';

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

class App extends Component {
  render() {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
      RootReducer,
      composeSetup(applyMiddleware(sagaMiddleware)), // allows redux devtools to watch sagas
    )
    sagaMiddleware.run(RootSaga)

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Sidebar />
            <PrivateRoute path="/" exact component={Canvas} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
