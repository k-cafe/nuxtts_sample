<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8>
        <v-card class="elevation-6">
          <v-progress-linear
            id="form"
            :indeterminate="isAuthorizing"
            :hidden="!isAuthorizing"
          ></v-progress-linear>
          <v-card-text>
            <v-form
              v-model="hasNoValidationError"
              lazy-validation
              @submit.prevent="logInIfNoValidationError"
            >
              <v-text-field
                v-model="email"
                prepend-icon="person"
                label="メール"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                ref="password"
                v-model="password"
                prepend-icon="lock"
                label="パスワード"
                :type="isPasswordConfirmed ? 'text' : 'password'"
                :append-icon="
                  isPasswordConfirmed ? 'visibility' : 'visibility_off'
                "
                :rules="passwordRules"
                required
                @click:append="isPasswordConfirmed = !isPasswordConfirmed"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              id="login"
              type="submit"
              color="primary"
              large
              block
              :disabled="!isAbleToAuthorize"
              @click="login"
              >ログイン</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { CanMove } from '~/extensions/can-move.interface'
import { commandTypes as AuthCommand } from '~/store/auth'

@Component
export default class LoginComponent extends Vue implements CanMove {
  // data
  private email = ''
  private password = ''
  private emailRules = [
    (email: string) => !!email || '必須入力です',
    (email: string) =>
      /.+@.+/.test(email) || 'メールアドレスを入力してください。'
  ]
  private passwordRules = [(password: string) => !!password || '必須入力です']
  private hasNoValidationError = true
  private isAuthorizing = false
  private isPasswordConfirmed = false
  // computed
  private get isAbleToAuthorize(): boolean {
    const isFormInitialized = this.email === '' || this.password === ''
    return (
      this.hasNoValidationError && !this.isAuthorizing && !isFormInitialized
    )
  }
  // methods
  private async login() {
    this.isAuthorizing = true
    const isSucceeded: boolean = await this.$store.dispatch(
      `auth/${AuthCommand.actionTypes.SIGN_IN}`,
      {
        email: this.email,
        password: this.password
      }
    )

    if (isSucceeded) this.moveTo()
    this.isAuthorizing = false
  }

  moveTo() {
    this.$router.replace({ name: 'index' })
  }
}
</script>
