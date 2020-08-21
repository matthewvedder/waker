import { takeLatest, call, put } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import { authHeaders, setAuth } from '../lib/Auth'
import history from '../History'
import {
  UPDATE_SEQUENCE,
  FETCH_SEQUENCE,
  FETCH_SEQUENCES,
  SET_SEQUENCE,
  CREATE_SEQUENCE,
  DELETE_SEQUENCE
} from '../actions/types'

const url = `${process.env.REACT_APP_API_URL}/sequences`
function updateRequest(action) {
  const { payload, id } = action
  return fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({
      ...payload
    })
  })
    .then(handleApiErrors)
    .then(setAuth)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* updateFlow(action) {
  try {
    const response = yield call(updateRequest, action)
    yield put({ type: FETCH_SEQUENCES })
  } catch (error) {
    // error? send it to redux
    // yield put({ type: LOGIN_ERROR, error })
  }
}

export function fetchPdfRequest(sequence) {
  const fetchUrl = `${url}/${sequence.id}/pdf`
  return fetch(fetchUrl, {
    method: 'GET',
    headers: authHeaders(),
    responseType: 'blob'
  })
    .then(handleApiErrors)
    .then(setAuth)
    .then(response => response.blob())
    .then(blob => blob)
    .catch((error) => { throw error })
}

function fetchRequest(action) {
  const fetchUrl = `${url}/${action.sequence_id}`
  return fetch(fetchUrl, {
    method: 'GET',
    headers: authHeaders()
  })
    .then(handleApiErrors)
    .then(setAuth)
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

export function indexRequest(options={}) {
  const params = options.feed ? '?feed=true' : ''
  return fetch(`${url}${params}`, {
    method: 'GET',
    headers: authHeaders()
  })
    .then(handleApiErrors)
    .then(setAuth)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* indexFlow(email, password) {
  try {
    yield put({ type: SET_SEQUENCE, payload: { loading: true }})
    const response = yield call(indexRequest)
    yield put({ type: SET_SEQUENCE, payload: { sequences: response, loading: false }})
  } catch (error) {

  }
}

function createRequest(payload) {
  return fetch(url, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      ...payload
    })
  })
    .then(handleApiErrors)
    .then(setAuth)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* createFlow(action) {
  try {
    const response = yield createRequest(action.payload)
    const { sequences, sequence } = response
    yield put({ type: SET_SEQUENCE, payload: { sequences }})
    history.push(`/sequences/${sequence.id}`)
  } catch (error) {
  }
}

function destroyRequest(id) {
  return fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  })
    .then(handleApiErrors)
    .then(setAuth)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* destroyFlow(action) {
  try {
    const response = yield destroyRequest(action.id)
    yield put({ type: SET_SEQUENCE, payload: { sequences: response }})
  } catch (error) {
  }
}


export function* watchSequence() {
  yield takeLatest(UPDATE_SEQUENCE, updateFlow)
  yield takeLatest(FETCH_SEQUENCE, fetchFlow)
  yield takeLatest(FETCH_SEQUENCES, indexFlow)
  yield takeLatest(CREATE_SEQUENCE, createFlow)
  yield takeLatest(DELETE_SEQUENCE,  destroyFlow)
}
