import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { firebaseConfig } from '~/environments/firebase'

const fb = firebase.initializeApp(firebaseConfig)

export const auth = fb.auth()
export const firestore = fb.firestore()
