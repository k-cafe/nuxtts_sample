import { UserId } from '~/typealias'

export class User {
  static NONE = new User()

  id: UserId
  displayName: string
  email: string
  pricingType: string

  constructor(user: Partial<User> = {}) {
    this.id = user.id || ''
    this.displayName = user.displayName || ''
    this.email = user.email || ''
    this.pricingType = user.pricingType || ''
  }
}
