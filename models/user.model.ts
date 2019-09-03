import { UserId } from '~/typealias'

export class User {
  id: UserId
  displayName: string
  email: string

  constructor(user: Partial<User> = {}) {
    this.id = user.id || ''
    this.displayName = user.displayName || ''
    this.email = user.email || ''
  }
}
