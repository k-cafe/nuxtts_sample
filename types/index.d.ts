import firebase from 'firebase'
import { Context } from '@nuxt/vue-app'

// declare module '@nuxt/vue-app/types/index' {
//   interface Context {
//     $auth?: firebase.auth.Auth
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
    [key: string]: (context: R, payload?: any) => void
  }

  interface CommitOptions {
    silent?: boolean
    root?: boolean
  }

  interface PageComponent {
    fetch?(ctx: Context): void | Promise<void>
  }
}
