import {
  CREATE_ASANA,
  ASANA_SUCCESS,
  ASANA_ERROR,
  SET_ASANAS
} from '../actions/types'

const initialState = {
  asanas: [],
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const reducer = function asanaReducer (state = initialState, action) {
  switch (action.type) {
    // Set the requesting flag and append a message to be shown
    case CREATE_ASANA:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'creating Asana...', time: new Date() }],
        errors: [],
      }

    case SET_ASANAS:
      return { asanas: action.payload }

    // Successful?  Reset the login state.
    case ASANA_SUCCESS:
      return {
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
      }

    // Append the error returned from our api
    // set the success and requesting flags to false
    case ASANA_ERROR:
      return {
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        requesting: false,
        successful: false,
      }

    default:
      return state
  }
}

export default reducer
