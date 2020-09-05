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
    .then(handleApiErrors)
    .then(setAuth)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}
