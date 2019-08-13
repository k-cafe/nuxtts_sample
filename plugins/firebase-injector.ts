import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { Context } from '@nuxt/vue-app'
import { firebaseConfig } from '~/environments/firebase'
import { VueInject } from '~/typealias';

const fb = firebase.initializeApp(firebaseConfig)

export default (context: Context, inject: VueInject) => {
  inject('firebase', fb)
  inject('firestore', fb.firestore())
  inject('auth', fb.auth())
}
