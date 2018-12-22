import { combineReducers } from 'redux'
import signup from './SignupReducer'
import { reducer as formReducer } from 'redux-form'

const RootReducer = combineReducers({
  signup,
  form: formReducer
})

export default RootReducer
