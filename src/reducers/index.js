import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import signup from './SignupReducer'
import login from './LoginReducer'
import client from './ClientReducer'
import asanaInstances from './AsanaInstanceReducer'
import { reducer as formReducer } from 'redux-form'

export default (history) => combineReducers({
  signup,
  login,
  client,
  asanaInstances,
  router: connectRouter(history),
  form: formReducer
})
