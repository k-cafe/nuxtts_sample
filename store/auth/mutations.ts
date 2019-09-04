import { VuexExtention } from '~/types'
import { State } from './state'
import { types } from './types'
import { UserId } from '~/typealias'
import { Commit } from 'vuex'
import { AuthRepository } from '~/repositories/auth.repository'

const mutationTypes = types.mutationTypes

const mutations: VuexExtention.MutationNode<State> = {
  [mutationTypes.SET_SIGN_IN_ID](state, { uid }: { uid: UserId }) {
    state.currentUserId = uid
  },
  [mutationTypes.SET_ID_TOKEN_RESULT](
    state,
    { idTokenResult }: { idTokenResult: firebase.auth.IdTokenResult }
  ) {
    state.idTokenResult = idTokenResult
  },
  [mutationTypes.SET_REPOSITORY](state, { commit }: { commit: Commit }) {
    state.authRepository = new AuthRepository(commit)
  }
}

export default mutations
