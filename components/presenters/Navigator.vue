<template>
  <v-navigation-drawer v-model="isOpened" clipped fixed app>
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
        @click.stop="isOpened = !isOpened"
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Drawer } from '~/interfaces/drawer.interface'

@Component
export default class NavigatorComponent extends Vue {
  @Prop()
  drawer!: Drawer

  private items = [
    {
      icon: 'mdi-apps',
      title: 'Welcome',
      to: '/'
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'Inspire',
      to: '/inspire'
    }
  ]

  private get isOpened(): boolean {
    return this.drawer.isOpened
  }

  private set isOpened(isOpened: boolean) {
    this.drawer.isOpened = isOpened
  }
}
</script>
