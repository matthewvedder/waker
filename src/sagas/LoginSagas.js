import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import { push } from 'connected-react-router'
import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from '../actions/types'
import {
  setClient,
  unsetClient,
} from '../actions'
import {
  CLIENT_UNSET,
} from '../actions/types'

const loginUrl = `${process.env.REACT_APP_API_URL}/user_token`

function loginApi (email, password) {
  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"auth": { email, password }}),
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* logout () {
  yield put(unsetClient())
  localStorage.removeItem('token')
  yield put(push('/'))
}

function* loginFlow (email, password) {
  let token
  try {
    // try to call to our loginApi() function.  Redux Saga
    // will pause here until we either are successful or
    // receive an error

    const response = yield call(loginApi, email, password)
    token = response.jwt
    // inform Redux to set our client token, this is non blocking so...
    yield put(setClient(token))
    yield put({ type: LOGIN_SUCCESS })
    localStorage.setItem('token', token)
    yield put(push('/'))
  } catch (error) {
    // error? send it to redux
    yield put({ type: LOGIN_ERROR, error })
  } finally {
    // No matter what, if our `forked` `task` was cancelled
    // we will then just redirect them to login
    if (yield cancelled()) {
      yield put(push('/login'))
    }
  }

  return token
}

export function* watchLogin() {
  while (true) {
    const { email, password } = yield take(LOGIN_REQUESTING)
    const task = yield fork(loginFlow, email, password)
    const action = yield take([CLIENT_UNSET, LOGIN_ERROR])
    if (action.type === CLIENT_UNSET) yield cancel(task)
    yield call(logout)
  }
}
