export type MappingObject<T> = { UNKNOWN: T, [key: string]: T }
export type VueInject = (targetKey: string, value: any) => void
