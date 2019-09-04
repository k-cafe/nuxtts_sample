import { VuexExtention } from '~/types'
import { State } from './state'
import { types } from './types'
import { isAppError } from '~/utils/is-app-error'
import { Nullable } from '~/typealias'

const actionTypes = types.actionTypes
const mutationTypes = types.mutationTypes
const SignoutId = ''

const actions: VuexExtention.ActionNode<State, any> = {
  async [actionTypes.INITIALIZE]({ state, commit, dispatch }) {
    commit(mutationTypes.SET_REPOSITORY, { commit })
    if (state.authRepository === null) return
    const firebaseUser = await state.authRepository.fetchCurrentUserIfSignedIn()
    await dispatch(actionTypes._SET_ALL_SIGN_IN_STATE, { firebaseUser })
  },
  async [actionTypes.SIGN_IN](
    { state, dispatch },
    { email, password }: { email: string; password: string }
  ) {
    if (state.authRepository === null) return
    const result = await state.authRepository.signInWithEmailAndPassword({
      email,
      password
    })
    if (!isAppError(result) && result.user !== null) {
      const firebaseUser = result.user
      await dispatch(actionTypes._SET_ALL_SIGN_IN_STATE, { firebaseUser })
    }
    return !isAppError(result)
  },
  async [actionTypes.SIGN_OUT]({ state, commit }) {
    if (state.authRepository === null) return
    await state.authRepository.signOut()
    commit(mutationTypes.SET_SIGN_IN_ID, { uid: SignoutId })
    commit(mutationTypes.SET_ID_TOKEN_RESULT, { idTokenResult: null })
  },
  async [actionTypes._SET_ALL_SIGN_IN_STATE](
    { commit },
    { firebaseUser }: { firebaseUser: Nullable<firebase.User> }
  ) {
    if (firebaseUser === null) {
      commit(mutationTypes.SET_SIGN_IN_ID, { uid: SignoutId })
      return
    }
    commit(mutationTypes.SET_SIGN_IN_ID, { uid: firebaseUser.uid })
    const idTokenResult = await firebaseUser.getIdTokenResult()
    commit(mutationTypes.SET_ID_TOKEN_RESULT, { idTokenResult })
  }
}

export default actions
