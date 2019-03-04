import {
  CREATE_ASANA_INSTANCE,
  FETCH_ASANA_INSTANCES,
  SET_ASANA_INSTANCE_DATA,
  DELETE_ASANA_INSTANCE,
  UPDATE_ASANA_INSTANCE
} from './types'

// there's literally no reason these are in a different
// format from the other component actions other than
// that I just lost track
export const createAsanaInstance = (asana_id, sequence_id) => {
  return {
    type: CREATE_ASANA_INSTANCE,
    asana_id,
    sequence_id
  }
}

export const updateAsanaInstance = (instance_id, payload) => {
  return {
    type: UPDATE_ASANA_INSTANCE,
    instance_id,
    payload
  }
}

export const fetchAsanaInstances = (sequence_id) => {
  return {
    type: FETCH_ASANA_INSTANCES,
    sequence_id
  }
}

export const deleteAsanaInstance = id => ({ type: DELETE_ASANA_INSTANCE, id })

export const setAsanaInstanceState = (payload) => {
  return {
    type: SET_ASANA_INSTANCE_DATA,
    payload
  }
}
