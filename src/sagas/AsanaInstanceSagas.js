import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
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
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({
      asana_id,
      sequence_id
    })
  })
    .then(handleApiErrors)
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
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(action.payload)
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* updateFlow(action) {
  const state = yield select()
  const { asanas } = state.asanaInstances

  try {
    const response = yield call(updateRequest, action)
    const instances = asanas.filter(a => a.id !== response.id)
    yield put({ type: SET_ASANA_INSTANCE_DATA, payload: { asanas: [...instances, response] } })
    // yield put({ type: LOGIN_SUCCESS })
  } catch (error) {
    // error? send it to redux
    // yield put({ type: LOGIN_ERROR, error })
  }
}

function deleteRequest(action) {
  return fetch(`${url}/${action.id}`, {
    method: 'DELETE',
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
