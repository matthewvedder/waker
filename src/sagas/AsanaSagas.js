import { call, put, takeLatest } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import {
  CREATE_ASANA,
  ASANA_ERROR,
  ASANA_SUCCESS,
  FETCH_ASANAS,
  FETCH_ASANA,
  SET_ASANAS,
  SET_ASANA,
  EDIT_ASANA
} from '../actions/types'

const url = `${process.env.REACT_APP_API_URL}/asanas`

function createApi (payload) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* createFlow (action) {
  try {
    const payload = yield call(createApi, action.payload)
    yield put({ type: ASANA_SUCCESS, payload })

  } catch (error) {
    console.warn(error)
    yield put({ type: ASANA_ERROR, error })
  }
}

function getApi (id) {
  return fetch(`${url}/${id}`, {
    method: 'GET'
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* getFlow (action) {
  try {
    const payload = yield call(getApi, action.asanaId)
    yield put({ type: ASANA_SUCCESS })
    yield put({ type: SET_ASANA, payload })

  } catch (error) {
    console.warn(error)
    yield put({ type: ASANA_ERROR, error })
  }
}

function editApi (id, payload) {
  return fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* editFlow (action) {
  try {
    const payload = yield call(editApi, action.asanaId, action.payload)
    yield put({ type: ASANA_SUCCESS })
    yield put({ type: SET_ASANA, payload })

  } catch (error) {
    console.warn(error)
    yield put({ type: ASANA_ERROR, error })
  }
}


function indexApi (payload) {
  return fetch(url, {
    method: 'GET'
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* indexFlow (action) {
  try {
    const payload = yield call(indexApi)
    yield put({ type: ASANA_SUCCESS })
    yield put({ type: SET_ASANAS, payload })

  } catch (error) {
    console.warn(error)
    yield put({ type: ASANA_ERROR, error })
  }
}

export function* watchAsanas() {
  yield takeLatest(CREATE_ASANA, createFlow)
  yield takeLatest(FETCH_ASANAS, indexFlow)
  yield takeLatest(FETCH_ASANA, getFlow)
  yield takeLatest(EDIT_ASANA, editFlow)
}
