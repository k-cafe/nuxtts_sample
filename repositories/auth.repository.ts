import { auth } from '~/plugins/firebase-initializer'

export class AuthRepository {
  constructor() {}

  async signInWithEmailAndPassword({
    email,
    password
  }: {
    email: string
    password: string
  }): Promise<firebase.auth.UserCredential> {
    return auth.signInWithEmailAndPassword(email, password)
  }

  signOut(): Promise<void> {
    return auth.signOut()
  }
}
