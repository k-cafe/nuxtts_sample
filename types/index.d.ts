import firebase from 'firebase'

// declare module '@nuxt/vue-app/types/index' {
//   interface Context {
//     $auth?: firebase.auth.Auth
//   }
// }

declare namespace VuexExtention {
  type Unsubscriber = () => void

  type StoreProperty = {
    [key: string]: string
  }

  type CommandTypes = {
    getterTypes: StoreProperty
    mutationTypes: StoreProperty
    actionTypes: StoreProperty
  }

  interface GetterNode<S> {
    [key: string]: ((state: S) => void) | ((state: S) => (...args: any[]) => void)
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
}
