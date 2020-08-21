import { CLIENT_SET, CLIENT_UNSET } from '../actions/types'

const initialSate = {
  user: {},
  auth: {},
}

const reducer = function clientReducer (state = initialSate, action) {
  switch (action.type) {
    case CLIENT_SET:
      return {
        user: action.user,
        auth: action.auth,
      }

    case CLIENT_UNSET:
      return {
        user: {},
        auth: {},
      }

    default:
      return state
  }
}

export default reducer
