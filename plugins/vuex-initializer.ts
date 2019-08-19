import { Context } from '@nuxt/vue-app/types/index'
import { commandTypes as AuthCommand } from '~/store/auth'

export default ({ store }: Context) => {
  store.dispatch(`auth/${AuthCommand.actionTypes.INITIALIZE}`)
  store.dispatch(`auth/${AuthCommand.actionTypes.WATCH_AUTH_STATE}`)
}
