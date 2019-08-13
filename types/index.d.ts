
import firebase from 'firebase'

declare module 'vue/types/vue' {
  interface Vue {
    $auth?: firebase.auth.Auth
    $firestore?: firebase.firestore.Firestore
  }
}

declare module '@nuxt/vue-app/types/index' {
  interface Context {
    $auth?: firebase.auth.Auth
  }
}
