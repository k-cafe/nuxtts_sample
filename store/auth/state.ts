import { Nullable, UserId } from '~/typealias'
import { AuthRepository } from '~/repositories/auth.repository'

export interface State {
  currentUserId: Nullable<UserId>
  idTokenResult: Nullable<firebase.auth.IdTokenResult>
  authRepository: Nullable<AuthRepository>
}

const state = (): State => ({
  currentUserId: null,
  idTokenResult: null,
  authRepository: null
})

export default state
