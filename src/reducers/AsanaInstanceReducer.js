import { SET_ASANA_INSTANCE_DATA } from '../actions/types'

const initialSate = {
  asanas: [],
  didCreate: false
}

const reducer = function asanaInstanceReducer (state = initialSate, action) {
  switch (action.type) {
    case SET_ASANA_INSTANCE_DATA:
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export default reducer
