import { VuexExtention } from '~/types'
import { State } from './state'
import { types } from './types'

const getterTypes = types.getterTypes

const getters: VuexExtention.GetterNode<State> = {
  [getterTypes.ERROR]: (state) => state.error,
  [getterTypes.HAS_ERROR]: (state) => state.error !== null
}

export default getters
