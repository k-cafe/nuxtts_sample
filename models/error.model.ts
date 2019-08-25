export class AppError {
  code: string
  message: string
  description: string
  stack?: string

  constructor(error: Partial<AppError> = {}) {
    this.code = error.code || ''
    this.message = error.message || ''
    this.description = error.description || ''
    this.stack = error.stack || ''
  }
}
