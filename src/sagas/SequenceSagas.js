import { takeLatest, call, put } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import {
  UPDATE_SEQUENCE,
  FETCH_SEQUENCE,
  FETCH_SEQUENCES,
  SET_SEQUENCE,
  CREATE_SEQUENCE
} from '../actions/types'

const url = `${process.env.REACT_APP_API_URL}/sequences`
function updateRequest(action) {
  const { payload, sequence_id } = action
  return fetch(`${url}/${sequence_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({
      ...payload
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

function fetchRequest(action) {
  const fetchUrl = `${url}/${action.sequence_id}`
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

function* fetchFlow(action) {
  yield put({ type: SET_SEQUENCE, payload: { layout: [] } })
  try {
    const response = yield call(fetchRequest, action)
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

function createRequest(payload) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({
      ...payload
    })
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* createFlow(action) {
  try {
    const response = yield createRequest(action.payload)
    yield put({ type: SET_SEQUENCE, payload: { sequences: response }})
  } catch (error) {
  }
}

export function* watchSequence() {
  yield takeLatest(UPDATE_SEQUENCE, updateFlow)
  yield takeLatest(FETCH_SEQUENCE, fetchFlow)
  yield takeLatest(FETCH_SEQUENCES, indexFlow)
  yield takeLatest(CREATE_SEQUENCE, createFlow)
}
