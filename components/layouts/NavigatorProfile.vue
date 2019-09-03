<template>
  <v-list>
    <v-list-item>
      <v-list-item-avatar>
        <v-icon>person</v-icon>
      </v-list-item-avatar>
    </v-list-item>

    <v-list-item link two-line>
      <v-list-item-content>
        <v-list-item-title class="title">Kohei Kitazawa</v-list-item-title>
        <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class NavigatorProfile extends Vue {}
</script>
