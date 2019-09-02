import { Context } from '@nuxt/types'

export interface PageComponent {
  fetch?(context: Context): void | Promise<void>
}
