import { Route } from 'vue-router'
import { Context } from '@nuxt/vue-app'

export default ({ app, redirect, store }: Context) => {
  if (typeof app.router === 'undefined') return
  app.router.beforeEach((to: Route, _: Route, next: (args?: any) => void) => {
    console.log(to.name)
    next()
  })
}
