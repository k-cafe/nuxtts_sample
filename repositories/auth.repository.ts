import { auth } from '~/plugins/firebase-initializer'
import { apiErrorHandler } from '~/decorators/error-handler.decorator'
import { FirebaseAuthorizationErrors } from '~/mapping-objects/auth.mapping.object'
import { Commit } from 'vuex'
import { BaseRepository } from '~/interfaces/base-repository.interface'

export class AuthRepository implements BaseRepository {
  _commit: Commit
  constructor(commit: Commit) {
    this._commit = commit
  }

  @apiErrorHandler(FirebaseAuthorizationErrors)
  async signInWithEmailAndPassword({
    email,
    password
  }: {
    email: string
    password: string
  }): Promise<firebase.auth.UserCredential> {
    return auth.signInWithEmailAndPassword(email, password)
  }

  @apiErrorHandler(FirebaseAuthorizationErrors)
  signOut(): Promise<void> {
    return auth.signOut()
  }
}
