import { SIGNUP_REQUESTING } from './types'

export const signupRequest = function signupRequest ({ email, password, password_confirmation }) {
  return {
    type: SIGNUP_REQUESTING,
    email,
    password,
    password_confirmation
  }
}
