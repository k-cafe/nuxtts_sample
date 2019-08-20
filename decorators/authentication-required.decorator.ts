import { Context } from '@nuxt/vue-app'
import { Store } from 'vuex'
import { VuexExtention } from '~/types'
import { commandTypes as PageTitleCommand } from '~/store/page-title'
import { commandTypes as AuthCommand } from '~/store/auth'
import { Mapper } from '~/models/mapper.model'
import { PageTitles } from '~/mapping-objects/page-title.mapping.object'
import { ClassObject } from '~/typealias'

export const authenticationRequired = <T extends ClassObject>(
  originComponent: T
) => {
  return class AuthenticationRequired extends originComponent
    implements VuexExtention.PageComponent {
    fetch({ redirect, store }: Context) {
      if (isFirstAccessed(store)) return
      const isAuthorized =
        store.getters[`auth/${AuthCommand.getterTypes.IS_AUTHORIZED}`]
      if (isAuthorized) return
      redirectLoginPage(redirect, store)
    }
  }
}

const isFirstAccessed = (store: Store<any>) =>
  !store.getters[`auth/${AuthCommand.getterTypes.IS_INITIALIZED}`]

const redirectLoginPage = (
  redirect: (path: string) => void,
  store: Store<any>
) => {
  const title = Mapper.value('login', PageTitles)
  store.commit(
    `page-title/${PageTitleCommand.mutationTypes.SET_CURRENT_TITLE}`,
    { title }
  )
  redirect('/login')
}
