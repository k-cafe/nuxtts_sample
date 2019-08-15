
import firebase from 'firebase'

declare module '@nuxt/vue-app/types/index' {
  interface Context {
    $auth?: firebase.auth.Auth
  }
}

declare module 'vuex/types/index' {
  // action内のthisのinterface
  interface InjectedContext {
    $auth?: firebase.auth.Auth
    $firestore?: firebase.firestore.Firestore
  }
}

declare namespace VuexExtention {
  interface GetterNode<S> {
    [key: string]: ((state: S) => void) | ((state: S) => (...args: any) => void)
  }

  interface MutationNode<S> {
    [key: string]: (state: S, payload?: any) => void
  }

  interface ActionNode<S, C> {
    [key: string]: (node: C, payload?: any) => void
  }
}
