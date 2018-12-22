import * as SignupSagas from './SignupSagas'

export default function* rootSaga() {
  yield [
    SignupSagas.watchSignup(),
  ]
}
