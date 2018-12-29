import { CLIENT_SET, CLIENT_UNSET } from './types'

// there's literally no reason these are in a different
// format from the other component actions other than
// that I just lost track
export const setClient = (token) => {
  return {
    type: CLIENT_SET,
    token
  }
}

export const unsetClient = () => {
  return {
    type: CLIENT_UNSET,
  }
}
