import { VuexExtention } from '~/types'
import { User } from '~/models/user.model'
import { Nullable } from '~/typealias'
import { UserRepository } from '~/repositories/user.repository'

const mutationTypes: VuexExtention.StoreProperty = {
  SET_USER: '[User] Set User'
}

const actionTypes: VuexExtention.StoreProperty = {
  INITIALIZE: '[User] Initialize',
  SUBSCRIBE_USER: '[User] Fetch User',
  REMOVE_USER: '[User] Remove User'
}

const getterTypes: VuexExtention.StoreProperty = {
  CURRENT_USER: '[User] Current User'
}

export const commandTypes: VuexExtention.CommandTypes = {
  getterTypes,
  mutationTypes,
  actionTypes
}

interface State {
  user: Nullable<User>
  userRepository: Nullable<UserRepository>
}

export const state = (): State => ({
  user: null,
  userRepository: null
})

export const getters: VuexExtention.GetterNode<State> = {
  [getterTypes.CURRENT_USER]: state => state.user
}

export const mutations: VuexExtention.MutationNode<State> = {
  [mutationTypes.SET_USER](state, { user }: { user: Nullable<User> }) {
    state.user = user
  }
}

export const actions: VuexExtention.ActionNode<State, any> = {
  [actionTypes.INITIALIZE] ({ state, commit }) {
    state.userRepository = new UserRepository(commit)
  }
}
