import { commandTypes } from '~/store/page-title'
import { Route } from 'vue-router';

export default ({ app, redirect, store }) => {
  app.router.beforeEach((to: Route, _: Route, next: (args?: any) => void) => {
    store.dispatch(`page-title/${commandTypes.actionTypes.CHANGE_PAGE}`, { pageTitle: to.name })
    next()
  })
}
