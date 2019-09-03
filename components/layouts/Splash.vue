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
import { LifecycleHook } from '~/extensions/lifecycle-hook.interface'
import { Nullable } from '~/typealias'
import { VuexExtention } from '~/types'
import { CanMove } from '~/extensions/can-move.interface'
import { commandTypes as AuthCommand } from '~/store/auth'
import { REDIRECT_ROUTE_NAME } from '~/configurations'

@Component
export default class SplashComponent extends Vue
  implements LifecycleHook, CanMove {
  private isLoading = true
  private unsubscribe: Nullable<VuexExtention.Unsubscriber> = null

  private signInUserSubscriber() {
    return this.$store.subscribe((mutation) => {
      if (!this.isSetSignedInUserMutation(mutation.type)) return
      if (!this.isAuthorized && this.$route.name !== REDIRECT_ROUTE_NAME) {
        this.redirectSignInPage()
      } else {
        this.showPage()
      }
    })
  }

  private isSetSignedInUserMutation(mutationType: string): boolean {
    const setSignInUserMutation = `auth/${AuthCommand.mutationTypes.SET_SIGN_IN_USER}`
    return mutationType === setSignInUserMutation
  }

  private get isAuthorized() {
    const isAuthorized = `auth/${AuthCommand.getterTypes.IS_AUTHORIZED}`
    return this.$store.getters[isAuthorized]
  }

  private async redirectSignInPage() {
    await this.moveTo()
    setTimeout(() => {
      this.showPage()
    }, 200)
  }

  private showPage() {
    this.isLoading = false
  }

  async moveTo() {
    await this.$nuxt.$router.replace({ name: REDIRECT_ROUTE_NAME })
  }

  created() {
    this.unsubscribe = this.signInUserSubscriber()
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
