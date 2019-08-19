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
    description: '認証エラーです'
  }),
  'auth/wrong-password': new AppError({
    code: 'FA0002',
    message: 'WRONG PASSWORD',
    description: '認証エラーです'
  }),
  'auth/too-many-requests': new AppError({
    code: 'FA0003',
    message: 'TOO MANY REQUESTS',
    description: 'アクセスが集中しています。しばらく経ってからもう一度アクセスしてください。'
  })
}
