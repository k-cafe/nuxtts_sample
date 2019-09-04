export interface State {
  currentPageTitle?: string
}

const state = (): State => ({
  currentPageTitle: 'PAGE NOT FOUND'
})

export default state
