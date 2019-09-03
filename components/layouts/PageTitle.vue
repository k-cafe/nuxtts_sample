<template>
  <v-layout fluid align-conter>
    <v-flex xs12 sm12 md12 class="ma-2 pa-2 headline">
      {{ pageTitle }}
      <v-divider dark light class="mt-2 mb-2"></v-divider>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { commandTypes } from '~/store/page-title'

@Component
export default class PageTitleComponent extends Vue {
  private get pageTitle(): string {
    const currentPageTitle = `page-title/${commandTypes.getterTypes.CURRENT_PAGE_TITLE}`
    return this.$store.getters[currentPageTitle]
  }
}
</script>
