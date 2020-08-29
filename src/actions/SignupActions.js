import { SIGNUP_REQUESTING } from './types'

export const signupRequest = function signupRequest ({ email, username, password, password_confirmation }) {
  return {
    type: SIGNUP_REQUESTING,
    email,
    username,
    password,
    password_confirmation
  }
}
