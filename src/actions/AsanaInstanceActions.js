import { CREATE_ASANA_INSTANCE, FETCH_ASANA_INSTANCES } from './types'

// there's literally no reason these are in a different
// format from the other component actions other than
// that I just lost track
export const createAsanaInstance = () => {
  return {
    type: CREATE_ASANA_INSTANCE
  }
}

export const fetchAsanaInstances = () => {
  return {
    type: FETCH_ASANA_INSTANCES
  }
}
