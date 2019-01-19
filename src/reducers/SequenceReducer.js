import { SET_SEQUENCE } from '../actions/types'

const initialSate = {
  layout: []
}

const reducer = function sequenceReducer(state = initialSate, action) {
  switch (action.type) {
    case SET_SEQUENCE:
      return {
        ...action.payload
      }

    default:
      return state
  }
}

export default reducer
