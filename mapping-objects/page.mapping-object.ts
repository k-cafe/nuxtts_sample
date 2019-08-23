import { MappingObject } from '~/typealias'
import { Navigator } from '~/models/navigator.model'

export const Pages: MappingObject<Navigator> = {
  UNKNOWN: {
    icon: '',
    title: 'PAGE NOT UNDEFINED',
    to: ''
  },
  login: {
    icon: '',
    title: 'Login',
    to: '/login'
  },
  index: {
    icon: 'mdi-apps',
    title: 'Welcome',
    to: '/'
  },
  inspire: {
    icon: 'mdi-chart-bubble',
    title: 'Inspire',
    to: '/inspire'
  }
}

