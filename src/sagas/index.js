import * as SignupSagas from './SignupSagas'
import * as LoginSagas from './LoginSagas'

export default function* rootSaga() {
  yield [
    SignupSagas.watchSignup(),
    LoginSagas.watchLogin()
  ]
}
