import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import signup from './SignupReducer'
import login from './LoginReducer'
import client from './ClientReducer'
import asanaInstances from './AsanaInstanceReducer'
import asanas from './AsanaReducer'
import sequence from './SequenceReducer'
import { reducer as formReducer } from 'redux-form'

export default (history) => combineReducers({
  signup,
  login,
  client,
  asanaInstances,
  sequence,
  asanas,
  router: connectRouter(history),
  form: formReducer
})
