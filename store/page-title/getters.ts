import { VuexExtention } from '~/types'
import { State } from './state'
import { types } from './types'

const getterTypes = types.getterTypes

const getters: VuexExtention.GetterNode<State> = {
  [getterTypes.CURRENT_PAGE_TITLE]: (state) => state.currentPageTitle
}

export default getters
