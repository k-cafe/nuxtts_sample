import { Context } from '@nuxt/vue-app/types/index'
import { commandTypes as AuthCommand } from '~/store/auth'

export default async ({ store }: Context) => {
  await store.dispatch(`auth/${AuthCommand.actionTypes.INITIALIZE}`)
  await store.dispatch(`auth/${AuthCommand.actionTypes.WATCH_AUTH_STATE}`)
}
