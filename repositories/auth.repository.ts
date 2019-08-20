import { Commit } from 'vuex'
import { auth } from '~/plugins/firebase-initializer'
import { apiErrorHandler } from '~/decorators/error-handler.decorator'
import { FirebaseAuthorizationErrors } from '~/mapping-objects/auth.mapping.object'
import { BaseRepository } from '~/interfaces/base-repository.interface'
import { Nullable } from '~/typealias'

export class AuthRepository implements BaseRepository {
  _commit: Commit
  constructor(commit: Commit) {
    this._commit = commit
  }

  static isAuthorized(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      auth.onAuthStateChanged(
        (user) => {
          resolve(user !== null)
        },
        () => {
          reject(false)
        }
      )
    })
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

  @apiErrorHandler(FirebaseAuthorizationErrors)
  fetchCurrentUserIfSignedIn(): Promise<Nullable<firebase.User>> {
    return new Promise<Nullable<firebase.User>>((resolve, reject) => {
      auth.onAuthStateChanged(
        (user) => {
          resolve(user)
        },
        (error) => {
          console.log(error)
          reject(null)
        }
      )
    })
  }
}
