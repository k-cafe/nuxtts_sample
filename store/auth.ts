import moment from 'moment'
import { isNullOrUndefined } from 'util';

const mutationTypes = {
  SET_SIGNIN_USER: '[Auth] Set Signin User',
  SET_ID_TOKEN_RESULT: '[Auth] Set IdTokenResult'
}

const actionTypes = {
  SIGN_IN: '[Auth] Sign In',
  SIGN_OUT: '[Auth] Sign Out',
  WATCH_AUTH_STATE: '[Auth] Watch Auth State'
}

const getterTypes = {
  IS_AUTHORIZED: '[Auth] Is Authorized',
  IS_TOKEN_EXPIRED: '[Auth] Is Token Expired'
}

interface State {
  currentUser?: firebase.User | null
  idTokenResult?: firebase.auth.IdTokenResult | null
}

export const commandTypes = {
  getterTypes,
  mutationTypes,
  actionTypes
}

export const state = (): State => ({
  currentUser: null,
  idTokenResult: null
})

export const getters = {
  [getterTypes.IS_AUTHORIZED]: (state: State) => !isNullOrUndefined(state.currentUser),
  [getterTypes.IS_TOKEN_EXPIRED]: (state: State) => {
    if (isNullOrUndefined(state.idTokenResult)) return true
    const expirationTime = +state.idTokenResult.expirationTime
    const currentTime = +moment()
    return currentTime - expirationTime > 0
  }
}

export const mutations = {
  [mutationTypes.SET_SIGNIN_USER] (state: State, { currentUser }: { currentUser: firebase.User }) {
    state.currentUser = currentUser
  },
  [mutationTypes.SET_ID_TOKEN_RESULT] (state: State, { idTokenResult }: { idTokenResult: firebase.auth.IdTokenResult }) {
    state.idTokenResult = idTokenResult
  }
}
