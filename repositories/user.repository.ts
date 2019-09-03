import { BaseRepository } from '~/extensions/base-repository.interface'
import { firestore } from '~/plugins/firebase-initializer'
import { Commit } from 'vuex'

export class UserRepository implements BaseRepository {
  _commit: Commit

  constructor(commit: Commit) {
    this._commit = commit
  }
}
