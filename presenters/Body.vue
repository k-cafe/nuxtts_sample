<template>
  <v-container fluid>
    <app-error />
    <nuxt />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ErrorComponent from './Error.vue'

@Component({
  components: {
    'app-error': ErrorComponent
  }
})
export default class BodyComponent extends Vue {}
</script>
