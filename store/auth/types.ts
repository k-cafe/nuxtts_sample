import { VuexExtention } from '~/types'
import { Nullable, UserId } from '~/typealias'
import { AuthRepository } from '~/repositories/auth.repository'

const mutationTypes: VuexExtention.StoreProperty = {
  SET_SIGN_IN_ID: '[Auth] Set Sign In User_ID',
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

export const types: VuexExtention.CommandTypes = {
  getterTypes,
  mutationTypes,
  actionTypes
}
