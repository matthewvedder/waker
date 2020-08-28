import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import { getAuth, setAuth } from '../lib/Auth'
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

const loginUrl = `${process.env.REACT_APP_API_URL}/auth/sign_in`

function handleLoginError(response) {
  if (!response.ok) throw Error(response.statusText)
  return response
}

function loginApi (email, password) {
  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(response => handleLoginError(response))
    .catch((error) => { throw error })
}

function* logout () {
  yield put(unsetClient())
  localStorage.removeItem('token')
  yield put(push('/'))
}

function* loginFlow (email, password) {
  try {
    const response = yield call(loginApi, email, password)
    const auth = getAuth(response)
    setAuth(response)
    response.json().then(result => {
      localStorage.setItem('user', JSON.stringify(result.data))
    })
    yield put({ type: LOGIN_SUCCESS })
    yield put(push('/'))
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error })
  } finally {
    if (yield cancelled()) {
      yield put(push('/login'))
    }
  }
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
