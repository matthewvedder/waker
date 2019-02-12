import { takeLatest, call, put } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import {
  UPDATE_SEQUENCE,
  FETCH_SEQUENCE,
  FETCH_SEQUENCES,
  SET_SEQUENCE
} from '../actions/types'

const url = `${process.env.REACT_APP_API_URL}/sequences`
function updateRequest(action) {
  return fetch(`${url}/1`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({
      ...action.payload
    })
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* updateFlow(action) {
  try {
    const response = yield call(updateRequest, action)
    yield put({ type: SET_SEQUENCE, payload: response })
    // yield put({ type: LOGIN_SUCCESS })
  } catch (error) {
    // error? send it to redux
    // yield put({ type: LOGIN_ERROR, error })
  }
}

function fetchRequest() {
  const fetchUrl = `${url}/1`
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
    yield put({ type: SET_SEQUENCE, payload: response })
    // yield put({ type: LOGIN_SUCCESS })
  } catch (error) {
    // error? send it to redux
    // yield put({ type: LOGIN_ERROR, error })
  }
}

function indexRequest() {
  return fetch(url, {
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

function* indexFlow(email, password) {
  try {
    const response = yield call(indexRequest)
    yield put({ type: SET_SEQUENCE, payload: { sequences: response }})
    // yield put({ type: LOGIN_SUCCESS })
  } catch (error) {
    // error? send it to redux
    // yield put({ type: LOGIN_ERROR, error })
  }
}

export function* watchSequence() {
  yield takeLatest(UPDATE_SEQUENCE, updateFlow)
  yield takeLatest(FETCH_SEQUENCE, fetchFlow)
  yield takeLatest(FETCH_SEQUENCES, indexFlow)
}
