import {
  LOGIN_REQUESTING,
} from './types'

// In order to perform an action of type LOGIN_REQUESTING
// we need an email and password
export const loginRequest = ({ email, password }) => {
  return {
    type: LOGIN_REQUESTING,
    email,
    password,
  }
}
