import { VuexExtention } from '~/types'
import { State } from './state'
import { AppError } from '~/models/error.model'
import { types } from './types'

const mutationTypes = types.mutationTypes

const mutations: VuexExtention.MutationNode<State> = {
  [mutationTypes.SET_ERROR](state, { error }: { error: AppError }) {
    state.error = error
  },
  [mutationTypes.REMOVE_ERROR](state) {
    state.error = null
  }
}

export default mutations
