<template>
  <v-container fluid>
    <nuxt />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class BodyComponent extends Vue {}
</script>
