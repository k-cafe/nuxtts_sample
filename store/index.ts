import { vuexfireMutations } from 'vuexfire'
import { VuexExtention } from '~/types'

export const mutations: VuexExtention.MutationNode<any> = {
  ...vuexfireMutations
}
