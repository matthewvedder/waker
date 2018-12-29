import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import { isAuthenticated } from './Auth'
import PrivateRoute from './components/PrivateRoute'
import Canvas from './components/Canvas'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Sidebar from './components/Sidebar'
import RootReducer from './reducers'
import RootSaga from './sagas'
import './styles/App.css';

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

class App extends Component {
  render() {
    const sagaMiddleware = createSagaMiddleware()
    const history = createBrowserHistory()
    const store = createStore(
      RootReducer(history),
      composeSetup(applyMiddleware(sagaMiddleware)), // allows redux devtools to watch sagas
    )
    sagaMiddleware.run(RootSaga)

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App">
            <Sidebar />
            <PrivateRoute path="/" exact component={Canvas} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
