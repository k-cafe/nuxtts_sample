import { VuexExtention } from '~/types'
import { AppError } from '~/models/error.model'
import { Nullable } from '~/typealias'

export const mutationTypes: VuexExtention.StoreProperty = {
  SET_ERROR: '[Error] Set Error',
  REMOVE_ERROR: '[Error] Remove Error'
}

export const getterTypes: VuexExtention.StoreProperty = {
  ERROR: '[Error] Error',
  HAS_ERROR: '[Error] Has Error',
  STATE: '[Error] State'
}

export const commandTypes: VuexExtention.CommandTypes = {
  getterTypes,
  mutationTypes,
  actionTypes: {}
}

interface State {
  error: Nullable<AppError>
}

export const state = (): State => ({
  error: null
})

export const getters: VuexExtention.GetterNode<State> = {
  [getterTypes.ERROR]: (state) => state.error,
  [getterTypes.HAS_ERROR]: (state) => state.error !== null
}

export const mutations: VuexExtention.MutationNode<State> = {
  [mutationTypes.SET_ERROR](state, { error }: { error: AppError }) {
    state.error = error
  },
  [mutationTypes.REMOVE_ERROR](state) {
    state.error = null
  }
}
