import { MappingObject } from '~/typealias'
import { Mapper } from '~/models/mapper.model'
import { ActionContext } from 'vuex'
import { VuexExtention } from '~/types/index'
import { PageTitles } from '~/mapping-objects/page-title.mapping.object'

const mutationTypes: VuexExtention.StoreProperty = {
  SET_CURRENT_TITLE: '[Title] Set Current Title'
}

const getterTypes: VuexExtention.StoreProperty = {
  CURRENT_PAGE_TITLE: '[Title] Get Current Page Title'
}

interface State {
  currentPageTitle?: string
}

export const commandTypes: VuexExtention.CommandTypes = {
  getterTypes,
  mutationTypes,
  actionTypes: {}
}

export const state = (): State => ({
  currentPageTitle: 'PAGE NOT FOUND'
})

export const getters: VuexExtention.GetterNode<State> = {
  [getterTypes.CURRENT_PAGE_TITLE]: (state: State) => state.currentPageTitle
}

export const mutations: VuexExtention.MutationNode<State> = {
  [mutationTypes.SET_CURRENT_TITLE]: (
    state: State,
    { title }: { title: string }
  ) => {
    state.currentPageTitle = title
  }
}
