import { Nullable } from '~/typealias'
import { AppError } from '~/models/error.model'

export interface State {
  error: Nullable<AppError>
}

const state = (): State => ({
  error: null
})

export default state
