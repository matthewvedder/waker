import { handleApiErrors } from '../lib/api-errors'
import { authHeaders, setAuth } from '../lib/Auth'

const url = `${process.env.REACT_APP_API_URL}/likes`

function createRequest(payload) {
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

function destroyRequest(id) {
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


export function toggleLike(like_by_current_user, id, type='sequence') {
  if (like_by_current_user) {
    return destroyRequest(like_by_current_user.id)
  } else {
    return createRequest({ [`${type}_id`]: id })
  }
}
