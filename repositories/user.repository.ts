import { Commit } from 'vuex'
import { BaseRepository } from '~/extensions/base-repository.interface'
import { firestore } from '~/plugins/firebase-initializer'
import { User } from '~/models/user.model'
import { UserId } from '~/typealias';

export class UserRepository implements BaseRepository {
  _commit: Commit

  constructor(commit: Commit) {
    this._commit = commit
  }

  find(userId: UserId) {
    
  }
}
