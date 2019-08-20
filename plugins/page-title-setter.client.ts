import { Route } from 'vue-router'
import { Context } from '@nuxt/vue-app'
import { commandTypes } from '~/store/page-title'
import { Mapper } from '~/models/mapper.model'
import { PageTitles } from '~/mapping-objects/page-title.mapping.object'

export default ({ app, store }: Context) => {
  if (typeof app.router === 'undefined') return
  app.router.beforeEach((to: Route, _: Route, next: (args?: any) => void) => {
    const pageTitle = Mapper.value(to.name as string, PageTitles)
    store.commit(`page-title/${commandTypes.mutationTypes.SET_CURRENT_TITLE}`, {
      title: pageTitle
    })
    next()
  })
}
