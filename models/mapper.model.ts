import { MappingObject } from '~/typealias'

export class Mapper {
  static value<T>(key: string, mappingObject: MappingObject<T>): T {
    const value = mappingObject[key]
    const isUndefined = typeof value === 'undefined'
    return isUndefined ? mappingObject.UNKNOWN : value
  }
}
