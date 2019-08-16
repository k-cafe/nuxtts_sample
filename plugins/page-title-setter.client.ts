import { commandTypes } from '~/store/page-title'
import { Route } from 'vue-router'
import { Context } from '@nuxt/vue-app'

export default ({ app, redirect, store }: Context) => {
  if (typeof app.router === 'undefined') return
  app.router.beforeEach((to: Route, _: Route, next: (args?: any) => void) => {
    store.dispatch(`page-title/${commandTypes.actionTypes.CHANGE_PAGE}`, {
      pageTitle: to.name
    })
    next()
  })
}
