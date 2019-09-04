import { VuexExtention } from '~/types'

export const mutationTypes: VuexExtention.StoreProperty = {
  SET_ERROR: '[Error] Set Error',
  REMOVE_ERROR: '[Error] Remove Error'
}

export const getterTypes: VuexExtention.StoreProperty = {
  ERROR: '[Error] Error',
  HAS_ERROR: '[Error] Has Error',
  STATE: '[Error] State'
}

export const types: VuexExtention.CommandTypes = {
  getterTypes,
  mutationTypes,
  actionTypes: {}
}
