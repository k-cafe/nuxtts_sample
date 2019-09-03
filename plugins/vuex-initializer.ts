import { Context } from '@nuxt/types'
import { commandTypes as AuthCommand } from '~/store/auth'

export default ({ store }: Context) => {
  store.dispatch(`auth/${AuthCommand.actionTypes.INITIALIZE}`)
}
