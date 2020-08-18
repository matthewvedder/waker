import { SET_SEQUENCE, RESET_SEQUENCE } from '../actions/types'

const initialSate = {
  layout: [],
  sequences: []
}

const reducer = function sequenceReducer(state = initialSate, action) {
  switch (action.type) {
    case SET_SEQUENCE:
      return { ...state, ...action.payload }
    case RESET_SEQUENCE:
      return { ...initialSate, sequences: state.sequences }

    default:
      return state
  }
}

export default reducer
