import { VuexExtention } from '~/types'
import { State } from './state'
import { types } from './types'

const mutationTypes = types.mutationTypes

const mutations: VuexExtention.MutationNode<State> = {
  [mutationTypes.SET_CURRENT_TITLE]: (state, { title }: { title: string }) => {
    state.currentPageTitle = title
  }
}

export default mutations
