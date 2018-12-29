import _ from 'lodash'

export const isAuthenticated = () => {
  return !_.isEmpty(localStorage.token)
}

export const logOut = () => {
  localStorage.removeItem('jwt')
}
