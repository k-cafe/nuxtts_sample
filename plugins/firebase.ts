import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { firebaseConfig } from '~/environments/firebase'


const fb = firebase.initializeApp(firebaseConfig)

export default (context: any, inject: any) => {
  inject('firebase', fb)
  inject('firestore', fb.firestore())
  inject('auth', fb.auth())
}
