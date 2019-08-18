import { MappingObject } from '~/typealias'
import { AppError } from '~/models/error.model'

export const FirebaseAuthorizationErrors: MappingObject<AppError> = {
  UNKNOWN: new AppError({
    code: 'FA0000',
    message: 'UNKNOWN',
    description: '管理者へ連絡してください'
  }),
  'auth/user-not-found': new AppError({
    code: 'FA0001',
    message: 'USER NOT FOUND',
    description: '認証エラー'
  })
}
