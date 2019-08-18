<template>
  <v-app-bar clipped-left fixed app>
    <v-app-bar-nav-icon
      @click.stop="drawer.state.isOpened = !drawer.state.isOpened"
    />
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
}
</script>
