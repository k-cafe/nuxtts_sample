import moment from 'moment'
import { ActionContext, Commit } from 'vuex/types/index'
import { VuexExtention } from '~/types/'
import { AuthRepository } from '~/repositories/auth.repository'
import { Nullable, UserId } from '~/typealias'
import { isAppError } from '~/utils/is-app-error'

const SignoutId = ''

const mutationTypes: VuexExtention.StoreProperty = {
  SET_SIGN_IN_USER: '[Auth] Set Sign In User',
  SET_ID_TOKEN_RESULT: '[Auth] Set IdTokenResult',
  SET_REPOSITORY: '[Auth] Set Repository'
}

const actionTypes: VuexExtention.StoreProperty = {
  SIGN_IN: '[Auth] Sign In',
  SIGN_OUT: '[Auth] Sign Out',
  INITIALIZE: '[Auth] Initialize',
  _SET_ALL_SIGN_IN_STATE: '[Auth] Set All Sign In State'
}

const getterTypes: VuexExtention.StoreProperty = {
  IS_AUTHORIZED: '[Auth] Is Authorized',
  IS_TOKEN_EXPIRED: '[Auth] Is Token Expired',
  IS_INITIALIZED: '[Auth] Is Initialized'
}

interface State {
  currentUserId: Nullable<UserId>
  idTokenResult: Nullable<firebase.auth.IdTokenResult>
  authRepository: Nullable<AuthRepository>
}

export const commandTypes: VuexExtention.CommandTypes = {
  getterTypes,
  mutationTypes,
  actionTypes
}

export const state = (): State => ({
  currentUserId: null,
  idTokenResult: null,
  authRepository: null
})

export const getters: VuexExtention.GetterNode<State> = {
  [getterTypes.IS_INITIALIZED]: (state) => state.currentUserId !== null,
  [getterTypes.IS_AUTHORIZED]: (state) =>
    state.currentUserId !== null && state.currentUserId !== '',
  [getterTypes.IS_TOKEN_EXPIRED]: (state) => {
    if (state.idTokenResult === null) return true
    const expirationTime = +state.idTokenResult.expirationTime
    const currentTime = +moment()
    return currentTime - expirationTime > 0
  }
}

export const mutations: VuexExtention.MutationNode<State> = {
  [mutationTypes.SET_SIGN_IN_USER](state, { uid }: { uid: UserId }) {
    state.currentUserId = uid
  },
  [mutationTypes.SET_ID_TOKEN_RESULT](
    state,
    { idTokenResult }: { idTokenResult: firebase.auth.IdTokenResult }
  ) {
    state.idTokenResult = idTokenResult
  },
  [mutationTypes.SET_REPOSITORY](state, { commit }: { commit: Commit }) {
    state.authRepository = new AuthRepository(commit)
  }
}

export const actions: VuexExtention.ActionNode<
  State,
  any
> = {
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
    commit(mutationTypes.SET_SIGN_IN_USER, { uid: SignoutId })
    commit(mutationTypes.SET_ID_TOKEN_RESULT, { idTokenResult: null })
  },
  async [actionTypes._SET_ALL_SIGN_IN_STATE](
    { commit },
    { firebaseUser }: { firebaseUser: Nullable<firebase.User> }
  ) {
    if (firebaseUser === null) {
      commit(mutationTypes.SET_SIGN_IN_USER, { uid: SignoutId })
      return
    }
    commit(mutationTypes.SET_SIGN_IN_USER, { uid: firebaseUser.uid })
    const idTokenResult = await firebaseUser.getIdTokenResult()
    commit(mutationTypes.SET_ID_TOKEN_RESULT, { idTokenResult })
  }
}
