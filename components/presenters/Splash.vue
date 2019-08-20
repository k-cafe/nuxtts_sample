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
import { LifecycleHook } from '~/interfaces/lifecycle-hook.interface'
import { Nullable } from '~/typealias'
import { VuexExtention } from '~/types'
import { CanMove } from '~/interfaces/can-move.interface'
import { commandTypes as AuthCommand } from '~/store/auth'

@Component
export default class SplashComponent extends Vue
  implements LifecycleHook, CanMove {
  private isLoading = true
  private unsubscribe: Nullable<VuexExtention.Unsubscriber> = null

  private setSignedInUserSubscriber() {
    return this.$store.subscribe((mutation) => {
      if (this.isNoSignedInUser(mutation.type)) return
      if (!this.isAuthorized && this.$route.name !== 'login') {
        this.redirectSignInPage()
      } else {
        this.showPage()
      }
    })
  }

  private isNoSignedInUser(mutationType: string): boolean {
    const setSignInUser = `auth/${AuthCommand.mutationTypes.SET_SIGN_IN_USER}`
    return mutationType !== setSignInUser
  }

  private get isAuthorized() {
    const isAuthorized = `auth/${AuthCommand.getterTypes.IS_AUTHORIZED}`
    return this.$store.getters[isAuthorized]
  }

  private async redirectSignInPage() {
    await this.moveTo()
    setTimeout(() => {
      this.showPage()
    }, 300)
  }

  private showPage() {
    this.isLoading = false
  }

  async moveTo() {
    await this.$nuxt.$router.replace({ name: 'login' })
  }

  created() {
    this.unsubscribe = this.setSignedInUserSubscriber()
  }

  updated() {
    // DOM要素をレンダリングする際に使用する変数が
    // isLoading以外に追加された場合は
    // @Watch('isLoading')の関数内にbeforeDestroyの内容を記述すること
    this.$destroy()
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
