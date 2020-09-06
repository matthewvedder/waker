import { handleApiErrors } from '../lib/api-errors'
import { authHeaders, setAuth, currentUser } from '../lib/Auth'

const url = `${process.env.REACT_APP_API_URL}/users`

export function updateUser(payload) {
  return fetch(`${url}/${currentUser().id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({
      ...payload
    })
  })
    // .then(handleApiErrors)
    .then(setAuth)
    .then(response => response.json().then(data => ({ response, data })))
}

export function sendPasswordResetEmail(payload) {
  return fetch(`${process.env.REACT_APP_API_URL}/auth/password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload
    })
  }).then(response => response.json().then(data => ({ response, data })))
}

export function resetPassword(payload) {
  const params = new URLSearchParams(window.location.search)
  return fetch(`${process.env.REACT_APP_API_URL}/auth/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'access-token': params.get('access-token'),
      'token-type': 'Bearer',
      'client': params.get('client'),
      'expiry': params.get('expiry'),
      'uid': params.get('uid')
    },
    body: JSON.stringify({
      ...payload
    })
  }).then(setAuth)
    .then(response => response.json().then(data => ({ response, data })))
}
