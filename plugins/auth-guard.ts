import { Route } from 'vue-router';

export default ({ app, redirect, store }) => {
  app.router.beforeEach((to: Route, _: Route, next: (args?: any) => void) => {
    console.log(to)
    next()
  })
}
