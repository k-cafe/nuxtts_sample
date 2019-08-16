import firebase from 'firebase'

// declare module '@nuxt/vue-app/types/index' {
//   interface Context {
//     $auth?: firebase.auth.Auth
//   }
// }

declare namespace VuexExtention {
  interface GetterNode<S> {
    [key: string]: ((state: S) => void) | ((state: S) => (...args: any) => void)
  }

  interface MutationNode<S> {
    [key: string]: (state: S, payload?: any) => void
  }

  interface ActionNode<S, R> {
    [key: string]: (context: R, payload?: any) => void
  }
}
