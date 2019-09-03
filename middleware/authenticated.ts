import { Context } from '@nuxt/types'
import { commandTypes as PageTitleCommand } from '~/store/page-title'
import { commandTypes as AuthCommand } from '~/store/auth'
import { Mapper } from '~/models/mapper.model'
import { Pages } from '~/mapping-objects/page.mapping-object'
import { REDIRECT_ROUTE_NAME } from '~/configurations'

export default (context: Context) => {
  if (isFirstAccessed(context) || isAuthorized(context)) {
    return
  }
  redirectLoginPage(context)
}

const isFirstAccessed = ({ store }: Context) =>
  !store.getters[`auth/${AuthCommand.getterTypes.IS_INITIALIZED}`]

const isAuthorized = ({ store }: Context) =>
  store.getters[`auth/${AuthCommand.getterTypes.IS_AUTHORIZED}`]

const redirectLoginPage = ({ redirect, store }: Context) => {
  const navigator = Mapper.value(REDIRECT_ROUTE_NAME, Pages)
  store.commit(
    `page-title/${PageTitleCommand.mutationTypes.SET_CURRENT_TITLE}`,
    { title: navigator.title }
  )
  redirect(navigator.to)
}
