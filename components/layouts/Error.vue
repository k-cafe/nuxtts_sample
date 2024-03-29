<template>
  <transition v-if="hasError" appear>
    <v-alert :value="true" type="error" dismissible @input="close"
      >[ {{ error.code }} ] {{ error.description }}</v-alert
    >
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Nullable } from '~/typealias'
import { LifecycleHook } from '~/extensions/lifecycle-hook.interface'
import { AppError } from '~/models/error.model'
import { VuexExtention } from '~/types'
import { commandTypes as ErrorCommand } from '~/store/error'

@Component
export default class ErrorComponent extends Vue implements LifecycleHook {
  private error: Nullable<AppError> = null
  private unwatch: Nullable<VuexExtention.Unwatcher> = null

  private get hasError() {
    return this.error !== null
  }

  private watchErrorStore() {
    const errorType = `error/${ErrorCommand.getterTypes.ERROR}`
    return this.$store.watch<AppError>(
      (_, getter) => getter[errorType],
      (error) => (this.error = error),
      { deep: true }
    )
  }

  private close() {
    this.error = null
  }

  created() {
    this.unwatch = this.watchErrorStore()
  }

  beforeDestroy() {
    if (this.unwatch === null) return
    this.unwatch()
  }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transform: translate(0px, 0px);
  transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.v-enter,
.v-leave-to {
  transform: translateY(-100px) translateY(0px);
}
</style>
