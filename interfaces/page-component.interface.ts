import { Context } from '@nuxt/vue-app'

export interface PageComponent {
  fetch?(context: Context): void | Promise<void>
}
