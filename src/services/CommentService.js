import { handleApiErrors } from '../lib/api-errors'
import { authHeaders, setAuth } from '../lib/Auth'

const url = `${process.env.REACT_APP_API_URL}/comments`

export function createComment(payload) {
  return fetch(url, {
    method: 'POST',
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

export function destroyComment(id) {
  return fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  })
    .then(handleApiErrors)
    .then(setAuth)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

export function fetchComments(payload) {
  const params = new URLSearchParams(payload).toString()
  return fetch(`${url}?${params}`, {
    method: 'GET'
  })
    .then(handleApiErrors)
    .then(setAuth)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}
