import { VuexExtention } from '~/types'
import moment from 'moment'
import { State } from './state'
import { types } from './types'

const getterTypes = types.getterTypes

const getters: VuexExtention.GetterNode<State> = {
  [getterTypes.IS_INITIALIZED]: (state) => state.currentUserId !== null,
  [getterTypes.IS_AUTHORIZED]: (state) =>
    state.currentUserId !== null && state.currentUserId !== '',
  [getterTypes.IS_TOKEN_EXPIRED]: (state) => {
    if (state.idTokenResult === null) return true
    const expirationTime = +state.idTokenResult.expirationTime
    const currentTime = +moment()
    return currentTime - expirationTime > 0
  }
}

export default getters
