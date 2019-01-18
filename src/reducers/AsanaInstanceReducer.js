import { SET_ASANA_INSTANCES } from '../actions/types'

const initialSate = {
  asanas: []
}

const reducer = function asanaInstanceReducer (state = initialSate, action) {
  switch (action.type) {
    case SET_ASANA_INSTANCES:
      return {
        asanas: action.asanas
      }

    default:
      return state
  }
}

export default reducer
