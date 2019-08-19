import { Route } from 'vue-router'
import { Context } from '@nuxt/vue-app'
import { commandTypes as AuthCommand } from '~/store/auth'

export default ({ app, redirect, store }: Context) => {
  if (typeof app.router === 'undefined') return
  app.router.beforeEach((to: Route, _: Route, next: (args?: any) => void) => {
    const isAuthorized: boolean = store.getters[`auth/${AuthCommand.getterTypes.IS_AUTHORIZED}`]
    if (isAuthorized) {
      console.log('guard')
      next()
    } else {
      console.log('AA')
      redirect('/login')
    }
  })
}
