import { combineReducers } from 'redux'
import signup from './SignupReducer'
import login from './LoginReducer'
import client from './ClientReducer'
import { reducer as formReducer } from 'redux-form'

const RootReducer = combineReducers({
  signup,
  login,
  client,
  form: formReducer
})

export default RootReducer
