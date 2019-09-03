<template>
  <v-navigation-drawer v-model="isOpened" clipped fixed app temporary>
    <navigator-profile></navigator-profile>
    <v-divider></v-divider>
    <v-list>
      <v-list-item
        v-for="(page, i) in pages"
        :key="i"
        :to="page.to"
        router
        exact
        @click.stop="isOpened = !isOpened"
      >
        <v-list-item-action>
          <v-icon>{{ page.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="page.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import NavigatorProfile from './NavigatorProfile.vue'
import { Drawer } from '~/models/drawer.model'
import { Pages } from '~/mapping-objects/page.mapping-object'

@Component({
  components: {
    'navigator-profile': NavigatorProfile
  }
})
export default class NavigatorComponent extends Vue {
  @Prop()
  drawer!: Drawer

  private pages = Object.values(Pages).filter((page) => page.icon !== '')

  private get isOpened(): boolean {
    return this.drawer.isOpened
  }

  private set isOpened(isOpened: boolean) {
    this.drawer.isOpened = isOpened
  }
}
</script>
