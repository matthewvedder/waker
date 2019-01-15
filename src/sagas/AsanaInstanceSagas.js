import { takeLatest, call } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import {
  CREATE_ASANA_INSTANCE,
  FETCH_ASANA_INSTANCES
} from '../actions/types'

const url = `${process.env.REACT_APP_API_URL}/asana_instances`
function createRequest() {
  return fetch(url, {
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
  try {
    const response = yield call(createRequest)
    // yield put({ type: LOGIN_SUCCESS })
  } catch (error) {
    // error? send it to redux
    // yield put({ type: LOGIN_ERROR, error })
  }
}

function fetchRequest() {
  const fetchUrl = `${url}?sequence_id=1`
  return fetch(fetchUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* fetchFlow(email, password) {
  try {
    const response = yield call(fetchRequest)
    console.log(response)
    // yield put({ type: LOGIN_SUCCESS })
  } catch (error) {
    // error? send it to redux
    // yield put({ type: LOGIN_ERROR, error })
  }
}

export function* watchAsanaInstances() {
  yield takeLatest(CREATE_ASANA_INSTANCE, createFlow)
  yield takeLatest(FETCH_ASANA_INSTANCES, fetchFlow)
}
