import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import signup from './SignupReducer'
import login from './LoginReducer'
import client from './ClientReducer'
import { reducer as formReducer } from 'redux-form'

export default (history) => combineReducers({
  signup,
  login,
  client,
  router: connectRouter(history),
  form: formReducer
})
