import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import history from './History'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'
import Paper from '@material-ui/core/Paper';
import createSagaMiddleware from 'redux-saga'
import PrivateRoute from './components/PrivateRoute'
import Sequence from './components/Sequence'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Sequences from './components/Sequences'
import Sidebar from './components/Sidebar'
import CreateAsana from './components/CreateAsana'
import AsanaIndex from './components/AsanaIndex'
import EditAsana from './components/EditAsana'
import YogaSutra from './pages/YogaSutra'
import RootReducer from './reducers'
import RootSaga from './sagas'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from "react-dnd";
import './styles/App.css'


const useStyles = makeStyles(theme => ({
  root: {
      display: 'flex',
      height: '100%',
      flexDirection: 'row',
    },
  }),
);

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const App = () => {

    const classes = useStyles()

    const theme = createMuiTheme({
      palette: {
        type: 'dark',
        primary: {
          main: '#41b3a3',
        },
        secondary: {
          main: '#C38D9B',
        },
        warning: {
          main: '#E27D60'
        }
      }
    });
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
      RootReducer(history),
      composeSetup(applyMiddleware(sagaMiddleware, routerMiddleware(history))), // allows redux devtools to watch sagas
    )
    sagaMiddleware.run(RootSaga)

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <Paper className={classes.root}>
              <Sidebar />
              <div className='main'>
                <PrivateRoute path="/" exact component={Sequences} />
                <PrivateRoute path="/asanas/new" component={CreateAsana} />
                <PrivateRoute path="/asanas" exact component={AsanaIndex} />
                <PrivateRoute path="/asanas/:id/edit" component={EditAsana} />
                <PrivateRoute path="/sequences" exact component={Sequences} />
                <PrivateRoute path="/sequences/:id" component={Sequence} />
                <Route path="/yoga-sutra" component={YogaSutra} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
              </div>
            </Paper>
          </ConnectedRouter>
        </ThemeProvider>
      </Provider>
    );
  }

export default DragDropContext(HTML5Backend)(App)
