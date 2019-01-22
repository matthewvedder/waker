import {
  CREATE_ASANA_INSTANCE,
  FETCH_ASANA_INSTANCES,
  SET_ASANA_INSTANCE_DATA,
  DELETE_ASANA_INSTANCE
} from './types'

// there's literally no reason these are in a different
// format from the other component actions other than
// that I just lost track
export const createAsanaInstance = (asana_id) => {
  return {
    type: CREATE_ASANA_INSTANCE,
    asana_id
  }
}

export const fetchAsanaInstances = () => {
  return {
    type: FETCH_ASANA_INSTANCES
  }
}

export const deleteAsanaInstance = id => ({ type: DELETE_ASANA_INSTANCE, id })

export const setAsanaInstanceState = (payload) => {
  return {
    type: SET_ASANA_INSTANCE_DATA,
    payload
  }
}
