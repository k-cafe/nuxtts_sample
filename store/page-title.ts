import { MappingObject } from '~/typealias'
import { Mapper } from '~/models/mapper.model'
import { Commit } from 'vuex'

const mutationTypes = {
  SET_CURRENT_TITLE: '[Title] Set Current Title'
}

const actionTypes = {
  CHANGE_PAGE: '[Title] Change Page'
}

const getterTypes = {
  CURRENT_PAGE_TITLE: '[Title] Get Current Page Title'
}

export const commandTypes = {
  getterTypes,
  mutationTypes,
  actionTypes
}

interface State {
  pageTitles: MappingObject<string>,
  currentPageTitle?: string
}

export const state = (): State => ({
  pageTitles: {
    UNKNOWN: 'PAGE NOT FOUND',
    index: 'TOP',
    inspire: 'INSPIRE'
  },
  currentPageTitle: 'PAGE NOT FOUND'
})


export const getters = {
  [commandTypes.getterTypes.CURRENT_PAGE_TITLE]: (state: State) => state.currentPageTitle
}
  
export const mutations = {
  [commandTypes.mutationTypes.SET_CURRENT_TITLE]: (state: State, { title }: { title: string }) => {
    state.currentPageTitle = title
  }
}
  
export const actions = {
  [commandTypes.actionTypes.CHANGE_PAGE]: (
    { state, commit }: { state: State, commit: Commit },
    { pageTitle }: { pageTitle: string }
  ) => {
    const title = Mapper.value<string>(pageTitle, state.pageTitles)
    commit(mutationTypes.SET_CURRENT_TITLE, { title })
  }
}
