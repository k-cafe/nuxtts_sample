import { VuexExtention } from '~/types'
import { AppError } from '~/models/error.model'

export const mutationTypes: VuexExtention.StoreProperty = {
  SET_ERROR: '[Error] Set Error',
  REMOVE_ERROR: '[Error] Remove Error'
}

export const getterTypes: VuexExtention.StoreProperty = {
  ERROR: '[Error] Error',
  HAS_ERROR: '[Error] Has Error'
}

export const commandTypes: VuexExtention.CommandTypes = {
  getterTypes,
  mutationTypes,
  actionTypes: {}
}

interface State {
  error?: AppError
}

export const state = (): State => ({})

export const getters: VuexExtention.GetterNode<State> = {
  [getterTypes.ERROR]: (state: State) => state.error,
  [getterTypes.HAS_ERROR]: (state: State) => typeof state.error !== 'undefined'
}

export const mutations: VuexExtention.MutationNode<State> = {
  [mutationTypes.SET_ERROR](state: State, { error }: { error: AppError }) {
    console.log(error)
    state.error = error
  },
  [mutationTypes.REMOVE_ERROR](state: State) {
    delete state.error
  }
}
