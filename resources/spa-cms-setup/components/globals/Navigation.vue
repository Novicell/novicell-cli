<template>
  <nav>
    <div class="navigation">
      <ul class="navigation-menu">
        <li v-for="item in navigationItems" :key="item.id">
          <ef-link :to="item.link.url" class="navigation-menu__link" :target="item.link.target">
            {{ item.link.name }}
          </ef-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import ALink from '~/components/common/ALink.vue';
import { I_NavigationItem } from '~/types';

@Component({
  components: {
    ALink,
  },
})
export default class TheNavigation extends Vue {
  get navigationItems(): I_NavigationItem[] {
    return this.$store.getters['navigation/getItems'];
  }
}
</script>

<style scoped></style>
