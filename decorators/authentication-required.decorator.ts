import { Context } from '@nuxt/vue-app'
import { Store } from 'vuex'
import { commandTypes as PageTitleCommand } from '~/store/page-title'
import { commandTypes as AuthCommand } from '~/store/auth'
import { Mapper } from '~/models/mapper.model'
import { Pages } from '~/mapping-objects/page.mapping-object'
import { ClassObject } from '~/typealias'
import { PageComponent } from '~/extensions/page-component.interface'
import { REDIRECT_ROUTE_NAME } from '~/configurations'

export const authenticationRequired = <T extends ClassObject>(
  originComponent: T
) => {
  return class AuthenticationRequired extends originComponent
    implements PageComponent {
    fetch(context: Context) {
      callSuperFetchIfDefined(context, super.fetch)

      if (isFirstAccessed(context.store)) return
      
      const isAuthorized =
        context.store.getters[`auth/${AuthCommand.getterTypes.IS_AUTHORIZED}`]
      if (isAuthorized) return
      redirectLoginPage(context.redirect, context.store)
    }
  }
}

const callSuperFetchIfDefined = (context: Context, superFetch: Function) => {
  if (typeof superFetch !== 'undefined') {
    superFetch(context)
  }
}

const isFirstAccessed = (store: Store<any>) =>
  !store.getters[`auth/${AuthCommand.getterTypes.IS_INITIALIZED}`]

const redirectLoginPage = (
  redirect: (path: string) => void,
  store: Store<any>
) => {
  const navigator = Mapper.value(REDIRECT_ROUTE_NAME, Pages)
  store.commit(
    `page-title/${PageTitleCommand.mutationTypes.SET_CURRENT_TITLE}`,
    { title: navigator.title }
  )
  redirect(navigator.to)
}
