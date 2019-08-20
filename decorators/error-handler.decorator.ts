import { FirebaseError } from 'firebase'
import { MappingObject } from '~/typealias'
import { AppError } from '~/models/error.model'
import { Mapper } from '~/models/mapper.model'
import { commandTypes as ErrorCommand } from '~/store/error'
import { BaseRepository } from '~/interfaces/base-repository.interface'

export const apiErrorHandler = (
  mappingObject: MappingObject<AppError>
): MethodDecorator => (
  _: Object,
  __: string | symbol,
  descriptor: TypedPropertyDescriptor<any>
) => {
  const original = descriptor.value
  descriptor.value = async function(this: BaseRepository, ...args: any[]) {
    this._commit(`error/${ErrorCommand.mutationTypes.REMOVE_ERROR}`, _, {
      root: true
    })
    return await original.apply(this, args).catch((error: FirebaseError) => {
      console.log(error)
      const appError = Mapper.value(error.code, mappingObject)
      this._commit(
        `error/${ErrorCommand.mutationTypes.SET_ERROR}`,
        {
          error: appError
        },
        { root: true }
      )
      return appError
    })
  }
}
