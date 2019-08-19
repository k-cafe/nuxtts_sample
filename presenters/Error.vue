<template>
  <transition v-if="hasError" appear>
    <v-alert :value="true" type="error" class="alert">
      [ {{ error.code }} ] {{ error.description }}
    </v-alert>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Nullable } from '../typealias'
import { LifecycleHook } from '../interfaces/lifecycle-hook.interface'
import { AppError } from '../models/error.model'
import { VuexExtention } from '../types'
import { commandTypes as ErrorCommand } from '~/store/error'

@Component
export default class ErrorComponent extends Vue implements LifecycleHook {
  private error: Nullable<AppError> = null
  private unsubscribe: Nullable<VuexExtention.Unsubscriber> = null

  private get hasError() {
    return this.error !== null
  }

  created() {
    this.unsubscribe = this.observeErrorStore()
  }

  observeErrorStore() {
    const errorType = `error/${ErrorCommand.getterTypes.ERROR}`
    return this.$store.watch<AppError>(
      (state, getter) => getter[errorType] as AppError,
      (error: AppError) => (this.error = error),
      { deep: true }
    )
  }

  destroyed() {
    if (this.unsubscribe !== null) {
      this.unsubscribe()
    }
  }
}
</script>

<style scoped>
.v-enter {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
.v-enter-active {
  transition: opacity 300ms ease-out;
  transform: translateY(-60px);
}
.v-leave {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}
.v-leave-active {
  transition: opacity 300ms reverse;
  transform: translateY(-60px);
}
</style>
