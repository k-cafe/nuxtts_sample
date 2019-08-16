export class AuthRepository {
  auth: firebase.auth.Auth

  constructor(auth: firebase.auth.Auth) {
    this.auth = auth
  }

  async signInWithEmailAndPassword({
    email,
    password
  }: {
    email: string
    password: string
  }): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  signOut(): Promise<void> {
    return this.auth.signOut()
  }
}
