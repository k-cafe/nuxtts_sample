import { AppError } from '~/models/error.model'

export const isAppError = (obj: any): obj is AppError => obj instanceof AppError
