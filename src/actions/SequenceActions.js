import {
  UPDATE_SEQUENCE,
  FETCH_SEQUENCE,
  FETCH_SEQUENCES,
  CREATE_SEQUENCE,
  DELETE_SEQUENCE 
} from './types'

// there's literally no reason these are in a different
// format from the other component actions other than
// that I just lost track
export const fetchSequence = (sequence_id) => {
  return {
    type: FETCH_SEQUENCE,
    sequence_id
  }
}

export const createSequence = (payload) => {
  return {
    type: CREATE_SEQUENCE,
    payload
  }
}

export const fetchSequences = () => {
  return {
    type: FETCH_SEQUENCES
  }
}

export const deleteSequence = (id) => {
  return {
    type: DELETE_SEQUENCE,
    id
  }
}

export const updateSequence = (payload, sequence_id) => {
  return {
    type: UPDATE_SEQUENCE,
    payload,
    sequence_id
  }
}
