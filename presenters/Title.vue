<template>
  <v-layout fluid align-conter>
    <v-flex xs12 sm12 md12 class="ma-2 pa-2 headline">
      {{ title }}
      <v-divider dark light class="mt-2 mb-2"></v-divider>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class TitleComponent extends Vue {
  private title = 'nuxt sample'
}
</script>
