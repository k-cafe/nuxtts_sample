<template>
  <transition v-if="hasError" appear>
    <v-alert :value="true" type="error" class="alert"></v-alert>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Nullable } from '../typealias'
import { LifecycleHook } from '../interfaces/lifecycle-hook.interface'
import { AppError } from '../models/error.model'
import { commandTypes as ErrorCommand } from '~/store/error'

@Component
export default class ErrorComponent extends Vue implements LifecycleHook {
  private error: Nullable<AppError> = null

  private get hasError() {
    return this.error !== null
  }

  created() {
    this.observeErrorStore()
  }

  observeErrorStore() {
    this.$store.subscribe((mutation) => {
      const observedMutationTypes = [
        `error/${ErrorCommand.mutationTypes.SET_ERROR}`,
        `error/${ErrorCommand.mutationTypes.REMOVE_ERROR}`
      ]
      if (!observedMutationTypes.includes(mutation.type)) return null
      const errorType = `error/${ErrorCommand.getterTypes.ERROR}`
      this.error = this.$store.getters[errorType]
    })
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
