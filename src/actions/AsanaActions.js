import {
  CREATE_ASANA,
  FETCH_ASANAS
} from './types'

export const createAsana = (payload) => ({ type: CREATE_ASANA, payload })
export const fetchAsanas = () => ({ type: FETCH_ASANAS })
