import { UPDATE_SEQUENCE, FETCH_SEQUENCE } from './types'

// there's literally no reason these are in a different
// format from the other component actions other than
// that I just lost track
export const fetchSequence = (layout) => {
  return {
    type: FETCH_SEQUENCE,
    layout
  }
}

export const updateSequence = (payload) => {
  return {
    type: UPDATE_SEQUENCE,
    payload
  }
}
