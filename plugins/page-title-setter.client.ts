import { Route } from 'vue-router'
import { Context } from '@nuxt/types'
import { commandTypes } from '~/store/page-title'
import { Mapper } from '~/models/mapper.model'
import { Pages } from '~/mapping-objects/page.mapping-object'

export default ({ app, store }: Context) => {
  if (typeof app.router === 'undefined') return
  app.router.beforeEach((to: Route, _: Route, next: (args?: any) => void) => {
    const pageTitle = Mapper.value(to.name as string, Pages).title
    store.commit(`page-title/${commandTypes.mutationTypes.SET_CURRENT_TITLE}`, {
      title: pageTitle
    })
    next()
  })
}
