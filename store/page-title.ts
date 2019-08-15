import { MappingObject } from '~/typealias'
import { Mapper } from '~/models/mapper.model'
import { Commit, AppActionContext, ActionContext } from 'vuex'
import { VuexExtention } from '~/types/index'

const mutationTypes = {
  SET_CURRENT_TITLE: '[Title] Set Current Title'
}

const actionTypes = {
  CHANGE_PAGE: '[Title] Change Page'
}

const getterTypes = {
  CURRENT_PAGE_TITLE: '[Title] Get Current Page Title'
}

interface State {
  pageTitles: MappingObject<string>,
  currentPageTitle?: string
}

export const commandTypes = {
  getterTypes,
  mutationTypes,
  actionTypes
}

export const state = (): State => ({
  pageTitles: {
    UNKNOWN: 'PAGE NOT FOUND',
    index: 'TOP',
    inspire: 'INSPIRE'
  },
  currentPageTitle: 'PAGE NOT FOUND'
})


export const getters: VuexExtention.GetterNode<State> = {
  [getterTypes.CURRENT_PAGE_TITLE]: (state: State) => state.currentPageTitle
}

export const mutations: VuexExtention.MutationNode<State> = {
  [mutationTypes.SET_CURRENT_TITLE]: (state: State, { title }: { title: string }) => {
    state.currentPageTitle = title
  }
}

export const actions: VuexExtention.ActionNode<State, ActionContext<State, any>> = {
  [actionTypes.CHANGE_PAGE](
    { state, commit }: ActionContext<State, any>,
    { pageTitle }: { pageTitle: string }
  ) {
    const title = Mapper.value<string>(pageTitle, state.pageTitles)
    commit(mutationTypes.SET_CURRENT_TITLE, { title })
  }
}
