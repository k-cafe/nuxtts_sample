<template>
  <v-app-bar clipped-left fixed app>
    <v-app-bar-nav-icon @click.stop="isOpened = !isOpened" />
    <v-toolbar-title v-text="title" />
    <v-spacer />
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Drawer } from '~/interfaces/drawer.interface'

@Component
export default class ToolbarComponent extends Vue {
  private title = 'Nuxt.js Sample'

  @Prop()
  drawer!: Drawer

  private get isOpened(): boolean {
    return this.drawer.isOpened
  }

  private set isOpened(isOpened: boolean) {
    this.drawer.isOpened = isOpened
  }
}
</script>
