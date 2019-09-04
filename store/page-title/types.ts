import { VuexExtention } from '~/types'

const mutationTypes: VuexExtention.StoreProperty = {
  SET_CURRENT_TITLE: '[Title] Set Current Title'
}

const getterTypes: VuexExtention.StoreProperty = {
  CURRENT_PAGE_TITLE: '[Title] Get Current Page Title'
}

export const types: VuexExtention.CommandTypes = {
  getterTypes,
  mutationTypes,
  actionTypes: {}
}
