import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import { authHeaders, setAuth } from '../lib/Auth'
import {
  CREATE_ASANA_INSTANCE,
  FETCH_ASANA_INSTANCES,
  SET_ASANA_INSTANCE_DATA,
  DELETE_ASANA_INSTANCE,
  UPDATE_ASANA_INSTANCE
} from '../actions/types'

const url = `${process.env.REACT_APP_API_URL}/asana_instances`
function createRequest(action) {
  const { asana_id, sequence_id } = action
  return fetch(url, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      asana_id,
      sequence_id
    })
  })
    .then(handleApiErrors)
    .then(response => setAuth(response))
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* createFlow(action) {
  try {
    const response = yield call(createRequest, action)
    yield put({ type:  SET_ASANA_INSTANCE_DATA, payload: { asanas: response, didCreate: true } })
    // yield put({ type: LOGIN_SUCCESS })
  } catch (error) {
    // error? send it to redux
    // yield put({ type: LOGIN_ERROR, error })
  }
}

function fetchRequest(action) {
  const fetchUrl = `${url}?sequence_id=${action.sequence_id}`
  return fetch(fetchUrl, {
    method: 'GET',
    headers: authHeaders()
  })
    .then(handleApiErrors)
    .then(response => setAuth(response))
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* fetchFlow(action) {
  try {
    const response = yield call(fetchRequest, action)
    yield put({ type: SET_ASANA_INSTANCE_DATA, payload: { asanas: response } })
    // yield put({ type: LOGIN_SUCCESS })
  } catch (error) {
    // error? send it to redux
    // yield put({ type: LOGIN_ERROR, error })
  }
}

function updateRequest(action) {
  const updateUrl = `${url}/${action.instance_id}`
  return fetch(updateUrl, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(action.payload)
  })
    .then(handleApiErrors)
    .then(response => setAuth(response))
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* updateFlow(action) {
  const state = yield select()
  const asanas = state.asanaInstances.asanas.slice()

  try {
    const response = yield call(updateRequest, action)
    const instance_index = asanas.findIndex(instance => instance.id === response.id)
    asanas[instance_index] = response
    yield put({ type: SET_ASANA_INSTANCE_DATA, payload: { asanas } })
    // yield put({ type: LOGIN_SUCCESS })
  } catch (error) {
    // error? send it to redux
    // yield put({ type: LOGIN_ERROR, error })
    console.log(error)
  }
}

function deleteRequest(action) {
  return fetch(`${url}/${action.id}`, {
    method: 'DELETE',
    headers: authHeaders()
  })
    .then(handleApiErrors)
    .then(response => setAuth(response))
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* deleteFlow(action) {
  try {
    const response = yield deleteRequest(action)
    yield put({ type:  SET_ASANA_INSTANCE_DATA, payload: { asanas: response } })
  } catch (error) {
    // error? send it to redux
    // yield put({ type: LOGIN_ERROR, error })
  }
}

export function* watchAsanaInstances() {
  yield takeLatest(CREATE_ASANA_INSTANCE, createFlow)
  yield takeLatest(FETCH_ASANA_INSTANCES, fetchFlow)
  yield takeLatest(UPDATE_ASANA_INSTANCE, updateFlow)
  yield takeEvery(DELETE_ASANA_INSTANCE, deleteFlow)
}
