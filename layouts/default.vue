<template>
  <v-app dark>
    <app-splash class="splash" />
    <app-navigator :drawer="drawer" />
    <app-toolbar :drawer="drawer" />
    <v-content>
      <app-error class="alert" />
      <app-title />
      <app-body />
    </v-content>
    <app-footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Splash from '../components/presenters/Splash.vue'
import AppError from '~/components/presenters/Error.vue'
import Footer from '~/components/presenters/Footer.vue'
import Body from '~/components/presenters/Body.vue'
import Toolbar from '~/components/presenters/Toolbar.vue'
import Navigator from '~/components/presenters/Navigator.vue'
import PageTitle from '~/components/presenters/PageTitle.vue'
import { Drawer } from '~/interfaces/drawer.interface'

@Component({
  components: {
    'app-footer': Footer,
    'app-body': Body,
    'app-toolbar': Toolbar,
    'app-navigator': Navigator,
    'app-title': PageTitle,
    'app-error': AppError,
    'app-splash': Splash
  }
})
export default class DefaultLayout extends Vue {
  private drawer: Drawer = { isOpened: false }
}
</script>

<style scoped>
.alert {
  width: 100%;
  position: absolute;
  z-index: 1;
  margin-top: -1px;
}

.splash {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
}
</style>
