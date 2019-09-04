import { Context } from '@nuxt/types'
import { types as AuthCommand } from '~/store/auth/types'

export default ({ store }: Context) => {
  store.dispatch(`auth/${AuthCommand.actionTypes.INITIALIZE}`)
}
