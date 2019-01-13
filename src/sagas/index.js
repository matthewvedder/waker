import * as SignupSagas from './SignupSagas'
import * as LoginSagas from './LoginSagas'
import * as AsanaInstanceSagas from './AsanaInstanceSagas'

export default function* rootSaga() {
  yield [
    SignupSagas.watchSignup(),
    LoginSagas.watchLogin(),
    AsanaInstanceSagas.watchAsanaInstances()
  ]
}
