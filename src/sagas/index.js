import * as SignupSagas from './SignupSagas'
import * as LoginSagas from './LoginSagas'
import * as AsanaInstanceSagas from './AsanaInstanceSagas'
import * as SequenceSagas from './SequenceSagas'
import * as AsanaSagas from './AsanaSagas'

export default function* rootSaga() {
  yield [
    SignupSagas.watchSignup(),
    LoginSagas.watchLogin(),
    SequenceSagas.watchSequence(),
    AsanaInstanceSagas.watchAsanaInstances(),
    AsanaSagas.watchAsanas()
  ]
}
