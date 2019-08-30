export class AppError extends Error {
  code: string
  message: string
  description: string
  stack?: string

  constructor(error: Partial<AppError> = {}) {
    super(error.message)
    this.code = error.code || ''
    this.message = error.message || ''
    this.description = error.description || ''
    this.stack = error.stack || ''
  }
}
