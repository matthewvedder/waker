import { logOut } from './Auth'

export function handleApiErrors (response) {
  if (response.status === 401) logOut()
  if (!response.ok) throw Error(response.statusText)
  return response
}
