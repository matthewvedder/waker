import {
  CREATE_ASANA
} from './types'

// there's literally no reason these are in a different
// format from the other component actions other than
// that I just lost track
export const createAsana = (payload) => ({ type: CREATE_ASANA, payload })
