<template>
  <v-app dark>
    <app-navigator :drawer="drawer" />
    <app-toolbar :drawer="drawer" />
    <v-content>
      <app-title />
      <app-body />
    </v-content>
    <app-footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Footer from '@/presenters/Footer.vue'
import Body from '@/presenters/Body.vue'
import Toolbar from '@/presenters/Toolbar.vue'
import Navigator from '@/presenters/Navigator.vue'
import Title from '@/presenters/Title.vue'

@Component({
  components: {
    'app-footer': Footer,
    'app-body': Body,
    'app-toolbar': Toolbar,
    'app-navigator': Navigator,
    'app-title': Title
  }
})
export default class DefaultLayout extends Vue {
  private drawer = { isOpened: false }
}
</script>
