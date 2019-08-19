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
import { setTimeout } from 'timers'
import { Component, Vue } from 'nuxt-property-decorator'
import { LifecycleHook } from '../../interfaces/lifecycle-hook.interface'
import { Nullable } from '../../typealias'
import { VuexExtention } from '../../types'
import { CanMove } from '../../interfaces/can-move.interface'
import { commandTypes as AuthCommand } from '~/store/auth'

@Component
export default class SplashComponent extends Vue
  implements LifecycleHook, CanMove {
  private loading = true
  private unsubscribe: Nullable<VuexExtention.Unsubscriber> = null

  private isNoSignedInUser(mutationType: string): boolean {
    const setSignInUser = `auth/${AuthCommand.mutationTypes.SET_SIGNIN_USER}`
    return mutationType !== setSignInUser
  }

  private get isAuthorized() {
    const isAuthorized = `auth/${AuthCommand.getterTypes.IS_AUTHORIZED}`
    return this.$store.getters[isAuthorized]
  }

  moveTo() {
    this.$nuxt.$router.replace({ name: 'login' }).then(() => {
      // Pageの描画処理を待つ
      setTimeout(() => {
        this.loading = false
      }, 300)
    })
  }

  private showCurrentPageIfAuthorized() {
    return this.$store.subscribe((mutation) => {
      if (this.isNoSignedInUser(mutation.type)) return
      if (!this.isAuthorized) {
        this.moveTo()
      } else {
        this.loading = false
      }
    })
  }

  created() {
    this.unsubscribe = this.showCurrentPageIfAuthorized()
  }

  beforeDestroy() {
    if (this.unsubscribe === null) return
    this.unsubscribe()
  }
}
</script>
