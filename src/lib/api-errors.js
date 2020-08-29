import { logOut } from './Auth'

export function handleApiErrors (response) {
  if (response.status === 401) logOut()
  if (!response.ok) throw Error(response.statusText)
  return response
}

export function mapErrorMessages(response) {
  return Object.entries(response).map(([key, value]) => {
    return `${key.split('_').join(' ')} ${value[0]}`.toLowerCase()
  })
}
