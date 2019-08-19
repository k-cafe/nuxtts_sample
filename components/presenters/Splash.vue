<template>
  <v-container v-if="isLoading" fluid fill-height class="background">
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
  private isLoading = true
  private unsubscribe: Nullable<VuexExtention.Unsubscriber> = null

  private setSignedInUserSubscriber() {
    return this.$store.subscribe((mutation) => {
      if (this.isNoSignedInUser(mutation.type)) return
      if (!this.isAuthorized) {
        this.redirectLoginPage()
      } else {
        this.showCurrentPage()
      }
    })
  }

  private isNoSignedInUser(mutationType: string): boolean {
    const setSignInUser = `auth/${AuthCommand.mutationTypes.SET_SIGNIN_USER}`
    return mutationType !== setSignInUser
  }

  private get isAuthorized() {
    const isAuthorized = `auth/${AuthCommand.getterTypes.IS_AUTHORIZED}`
    return this.$store.getters[isAuthorized]
  }

  private redirectLoginPage() {
    this.moveTo()
  }

  private showCurrentPage() {
    this.isLoading = false
  }

  moveTo() {
    this.$nuxt.$router.replace({ name: 'login' }).then(() => {
      // Pageの描画処理を待つ
      setTimeout(() => {
        this.isLoading = false
      }, 300)
    })
  }

  created() {
    this.unsubscribe = this.setSignedInUserSubscriber()
  }

  beforeDestroy() {
    if (this.unsubscribe === null) return
    this.unsubscribe()
  }
}
</script>

<style scoped>
.background {
  background-color: #d8d8d8;
}
</style>
