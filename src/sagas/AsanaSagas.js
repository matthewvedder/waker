import { call, put, takeLatest } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import {
  CREATE_ASANA,
  ASANA_ERROR,
  ASANA_SUCCESS,
} from '../actions/types'

const url = `${process.env.REACT_APP_API_URL}/asanas`

function createApi (payload) {
  console.log(payload)
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

export function* watchAsanas() {
  yield takeLatest(CREATE_ASANA, createFlow)
}
