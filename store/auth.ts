const mutationTypes = {
  SET_CREDENTIAL: '[Auth] Set Credential'
}

const actionTypes = {
  INITIALIZE_AUTH: '[Auth] Initialize Auth'
}

const getterTypes = {
  IS_AUTHORIZED: '[Auth] Is Authorized',
  IS_TOKEN_EXPIRED: '[Auth] Is Token Expired'
}

export const commandTypes = {
  getterTypes,
  mutationTypes,
  actionTypes
}
