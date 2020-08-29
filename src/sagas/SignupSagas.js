import { call, put, takeLatest } from 'redux-saga/effects'
import { handleApiErrors, mapErrorMessages } from '../lib/api-errors'
import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from '../actions/types'

const signupUrl = `${process.env.REACT_APP_API_URL}/users`

function signupApi(email, username, password, password_confirmation) {
  return fetch(signupUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, username, password, password_confirmation }),
  })
    .then(response => response.json().then(data => ({ response, data })))
}


function* signupFlow (action) {
  try {
    const { email, username, password, password_confirmation } = action
    const { response, data } = yield call(signupApi, email, username, password, password_confirmation)
    console.log(response, response.ok, data)
    if (response.ok) {
      yield put({ type: SIGNUP_SUCCESS, response: data })
    } else {
      yield put({ type: SIGNUP_ERROR, error: mapErrorMessages(data) })
    }
  } catch (error) {
    yield put({ type: SIGNUP_ERROR, error })
  }
}

export function* watchSignup() {
  yield takeLatest(SIGNUP_REQUESTING, signupFlow)
}
