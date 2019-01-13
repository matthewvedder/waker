import { takeLatest, call } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import {
  CREATE_ASANA_INSTANCE
} from '../actions/types'

const loginUrl = `${process.env.REACT_APP_API_URL}/asana_instances`

function createRequest() {
  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({
      'asana_id': 1,
      'sequence_id': 1
    })
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* createFlow(email, password) {
  let token
  try {
    const response = yield call(createRequest, email, password)
    console.log(response)
    // yield put({ type: LOGIN_SUCCESS })
  } catch (error) {
    // error? send it to redux
    // yield put({ type: LOGIN_ERROR, error })
    console.log('error')
  }

  return token
}

export function* watchAsanaInstances() {
  yield takeLatest(CREATE_ASANA_INSTANCE, createFlow)
}
