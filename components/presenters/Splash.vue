<template>
  <v-container v-if="loading" fluid fill-height style="background: #D8D8D8">
    <v-layout align-center row wrap>
      <v-flex xs12 class="text-center">
        <v-progress-circular
          :size="150"
          color="accent"
          indeterminate
          dark
        ></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { LifecycleHook } from '../../interfaces/lifecycle-hook.interface'
import { Nullable } from '../../typealias'
import { VuexExtention } from '../../types'
import { commandTypes as AuthCommand } from '~/store/auth'

@Component
export default class SplashComponent extends Vue implements LifecycleHook {
  private loading = true
  private unsubscribe: Nullable<VuexExtention.Unsubscriber> = null

  created() {
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type !== `auth/${AuthCommand.mutationTypes.SET_SIGNIN_USER}`)
        return
      this.loading = false
    })
  }

  beforeDestroy() {
    if (this.unsubscribe === null) return
    this.unsubscribe()
  }
}
</script>
