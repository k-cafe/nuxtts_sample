<template>
  <v-app-bar clipped-left fixed app>
    <v-app-bar-nav-icon @click.stop="isOpened = !isOpened" />
    <v-toolbar-title v-text="title" />
    <v-spacer></v-spacer>
    <v-btn icon @click="logout">
      <v-icon>exit_to_app</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { CanMove } from '~/interfaces/can-move.interface'
import { Drawer } from '~/interfaces/drawer.interface'
import { commandTypes as AuthCommand } from '~/store/auth'

@Component
export default class ToolbarComponent extends Vue implements CanMove {
  private title = 'Nuxt.js Sample'

  @Prop()
  drawer!: Drawer

  private get isOpened(): boolean {
    return this.drawer.isOpened
  }

  private set isOpened(isOpened: boolean) {
    this.drawer.isOpened = isOpened
  }

  private async logout() {
    await this.$store.dispatch(`auth/${AuthCommand.actionTypes.SIGN_OUT}`)
    if (this.$route.name === 'login') return
    await this.moveTo()
  }

  async moveTo() {
    await this.$router.replace({ name: 'login' })
  }
}
</script>
