import { VuexExtention } from "~/types"
import { vuexfireMutations } from 'vuexfire'

export const mutations: VuexExtention.MutationNode<any> = {
  ...vuexfireMutations
}
