import { AppError } from '~/models/error.model'

export type MappingObject<T> = { UNKNOWN: T; [key: string]: T }
export type VueInject = (targetKey: string, value: any) => void
export type Nullable<T> = T | null
export type UserId = string
export type ClassObject = { new (...args: any[]) }
export type AppErrorOr<T> = AppError | T
