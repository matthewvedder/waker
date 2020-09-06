import _ from 'lodash'
import { push } from 'connected-react-router'

export const isAuthenticated = () => {
  return !_.isEmpty(localStorage.auth)
}

export const authHeaders = () => {
  const auth = JSON.parse(localStorage.auth)
  return {
    'Content-Type': 'application/json',
    'access-token': auth.accessToken,
    'token-type': 'Bearer',
    'client': auth.client,
    'expiry': auth.expiry,
    'uid': auth.uid
  }
}

export const setAuth = (response) => {
  const auth = getAuth(response)
  if (response.status === 401) logOut()
  if (auth.accessToken) {
    localStorage.setItem('auth', JSON.stringify(auth))
  }
  return response
}

export const setCurrentUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const currentUser = () => {
  if (_.isEmpty(localStorage.user)) return {}
  return JSON.parse(localStorage.user)
}

export const getAuth = (response) => {
  const accessToken = response.headers.get('access-token')
  const client = response.headers.get('client')
  const expiry = response.headers.get('expiry')
  const uid = response.headers.get('uid')
  return { accessToken, client, expiry, uid }
}

export const logOut = () => {
  localStorage.removeItem('auth')
  localStorage.removeItem('user')
  window.location = window.location.pathname
}
