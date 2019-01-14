import _ from 'lodash'
import { push } from 'connected-react-router'

export const isAuthenticated = () => {
  return !_.isEmpty(localStorage.token)
}

export const logOut = () => {
  localStorage.removeItem('token')
  window.location = window.location.pathname
}
