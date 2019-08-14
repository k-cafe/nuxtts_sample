
import firebase from 'firebase'

declare module '@nuxt/vue-app/types/index' {
  interface Context {
    $auth?: firebase.auth.Auth
  }
}

declare module 'vuex/types/index' {
  interface  CustomStoreContext {
    $auth?: firebase.auth.Auth
    $firestore?: firebase.firestore.Firestore
  }
}
