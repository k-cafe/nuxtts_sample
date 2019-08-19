import moment from 'moment'
import { isNullOrUndefined } from 'util'
import { VuexExtention } from '~/types/'
import { ActionContext, Commit } from 'vuex/types/index'
import { AuthRepository } from '~/repositories/auth.repository'
import { Nullable, UserId } from '~/typealias';

const mutationTypes: VuexExtention.StoreProperty = {
  SET_SIGNIN_USER: '[Auth] Set Signin User',
  SET_ID_TOKEN_RESULT: '[Auth] Set IdTokenResult',
  SET_REPOSITORY: '[Auth] Set Repository'
}

const actionTypes: VuexExtention.StoreProperty = {
  SIGN_IN: '[Auth] Sign In',
  SIGN_OUT: '[Auth] Sign Out',
  WATCH_AUTH_STATE: '[Auth] Watch Auth State',
  INITIALIZE: '[Auth] Initialize'
}

const getterTypes: VuexExtention.StoreProperty = {
  IS_AUTHORIZED: '[Auth] Is Authorized',
  IS_TOKEN_EXPIRED: '[Auth] Is Token Expired'
}

interface State {
  currentUserUid: Nullable<UserId>
  idTokenResult: Nullable<firebase.auth.IdTokenResult>
  authRepository: Nullable<AuthRepository>
}

export const commandTypes: VuexExtention.CommandTypes = {
  getterTypes,
  mutationTypes,
  actionTypes
}

export const state = (): State => ({
  currentUserUid: null,
  idTokenResult: null,
  authRepository: null
})

export const getters: VuexExtention.GetterNode<State> = {
  [getterTypes.IS_AUTHORIZED]: (state: State) =>
    !isNullOrUndefined(state.currentUserUid),
  [getterTypes.IS_TOKEN_EXPIRED]: (state: State) => {
    if (isNullOrUndefined(state.idTokenResult)) return true
    const expirationTime = +state.idTokenResult.expirationTime
    const currentTime = +moment()
    return currentTime - expirationTime > 0
  }
}

export const mutations: VuexExtention.MutationNode<State> = {
  [mutationTypes.SET_SIGNIN_USER](
    state: State,
    { uid }: { uid: UserId }
  ) {
    state.currentUserUid = uid
  },
  [mutationTypes.SET_ID_TOKEN_RESULT](
    state: State,
    { idTokenResult }: { idTokenResult: firebase.auth.IdTokenResult }
  ) {
    state.idTokenResult = idTokenResult
  },
  [mutationTypes.SET_REPOSITORY](state: State, { commit }: { commit: Commit }) {
    state.authRepository = new AuthRepository(commit)
  }
}

export const actions: VuexExtention.ActionNode<
  State,
  ActionContext<State, any>
> = {
  [actionTypes.INITIALIZE]({ commit }: ActionContext<State, any>) {
    commit(mutationTypes.SET_REPOSITORY, { commit })
  },
  async [actionTypes.SIGN_IN](
    { state }: ActionContext<State, any>,
    { email, password }: { email: string; password: string }
  ) {
    if (isNullOrUndefined(state.authRepository)) return
    const credential = await state.authRepository.signInWithEmailAndPassword({
      email,
      password
    })
    return isNullOrUndefined(credential)
  },
  async [actionTypes.WATCH_AUTH_STATE] ({ state, commit }: ActionContext<State, any>) {
    if (state.authRepository === null) return
    const firebaseUser = await state.authRepository.fetchCurrentUserIfSignedIn()
    if (firebaseUser === null) return
    commit(mutationTypes.SET_SIGNIN_USER, { uid: firebaseUser.uid })
  }
}
