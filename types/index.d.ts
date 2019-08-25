import { CommitOptions, ActionContext } from 'vuex'
import { Context } from '@nuxt/vue-app'

// declare module 'vue/types/vue' {
//   interface Vue {
//     fetch?(ctx: Context): Promise<void> | void
//   }
// }

declare namespace VuexExtention {
  type Unwatcher = () => void
  type Unsubscriber = () => void

  interface StoreProperty {
    [key: string]: string
  }

  interface CommandTypes {
    getterTypes: StoreProperty
    mutationTypes: StoreProperty
    actionTypes: StoreProperty
  }

  interface GetterNode<S> {
    [key: string]:
      | ((state: S) => void)
      | ((state: S) => (...args: any[]) => void)
  }

  interface MutationNode<S> {
    [key: string]: (state: S, payload?: any, options?: CommitOptions) => void
  }

  interface ActionNode<S, R> {
    [key: string]: (context: ActionContext<S, R>, payload?: any) => void
  }
}
