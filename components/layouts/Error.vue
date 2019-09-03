<template>
  <transition v-if="hasError" appear>
    <v-alert :value="true" type="error" dismissible @input="close"
      >[ {{ error.code }} ] {{ error.description }}</v-alert
    >
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { AppError } from '~/models/error.model'
import { commandTypes as ErrorCommand } from '~/store/error'

@Component
export default class ErrorComponent extends Vue {
  get error(): AppError {
    const error = `error/${ErrorCommand.getterTypes.ERROR}`
    return this.$store.getters[error]
  }

  private get hasError() {
    return this.error !== null
  }

  private close() {
    const command = `error/${ErrorCommand.mutationTypes.REMOVE_ERROR}`
    this.$store.commit(command)
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
