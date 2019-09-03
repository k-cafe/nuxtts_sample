<template>
  <v-list>
    <v-list-item>
      <v-list-item-avatar>
        <v-icon>person</v-icon>
      </v-list-item-avatar>
    </v-list-item>

    <v-list-item link two-line>
      <v-list-item-content>
        <v-list-item-title class="title">{{
          user.displayName | signInRequired
        }}</v-list-item-title>
        <v-list-item-subtitle>{{
          user.email | signInRequired
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { User } from '~/models/user.model'
import { commandTypes } from '~/store/user'

@Component({
  filters: {
    signInRequired(property: string) {
      return property || 'Sign In Required'
    }
  }
})
export default class NavigatorProfile extends Vue {
  get user(): User {
    const currentUserCommand = `user/${commandTypes.getterTypes.CURRENT_USER}`
    return this.$store.getters[currentUserCommand]
  }
}
</script>
