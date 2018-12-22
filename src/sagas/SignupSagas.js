import { call, put, takeLatest } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from '../actions/types'

const signupUrl = `${process.env.REACT_APP_API_URL}/users`

function signupApi (email, password, password_confirmation) {
  return fetch(signupUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, password_confirmation }),
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* signupFlow (action) {
  try {
    const { email, password, password_confirmation } = action
    const response = yield call(signupApi, email, password, password_confirmation)
    yield put({ type: SIGNUP_SUCCESS, response })
  } catch (error) {
    yield put({ type: SIGNUP_ERROR, error })
  }
}

export function* watchSignup() {
  yield takeLatest(SIGNUP_REQUESTING, signupFlow)
}
