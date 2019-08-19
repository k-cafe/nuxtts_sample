<template>
  <v-app dark>
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
import ErrorComponent from '~/components/presenters/Error.vue'
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
    'app-error': ErrorComponent
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
</style>
