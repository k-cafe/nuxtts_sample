<template>
  <v-app-bar clipped-left fixed app>
    <v-app-bar-nav-icon @click.stop="drawer.isOpened = !drawer.isOpened" />
    <v-toolbar-title v-text="title" />
    <v-spacer />
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class ToolbarComponent extends Vue {
  private title = 'Nuxt.js Sample'

  @Prop()
  drawer!: Object /* { isOpened: false }  */
}
</script>
