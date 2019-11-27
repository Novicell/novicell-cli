<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <ef-segment-list :segments="segments" />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-9">
          <ul>
            <li v-for="item in navigation" :key="item.id">
              <ef-link :to="item.url" :blank="item.target">
                {{ item.name }}
              </ef-link>
            </li>
          </ul>
        </div>
        <div class="col-xs-12 col-md-3">
          <ul>
            <li v-for="item in secondaryNavigation" :key="item.id">
              <ef-link :to="item.url" :blank="item.target">
                {{ item.name }}
              </ef-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <ul>
            <li v-for="item in legalLinks" :key="item.id">
              <ef-link :to="item.url" :blank="item.target">
                {{ item.name }}
              </ef-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { NavigationItem, Link } from '~/types';
import EfLink from '~/components/common/EfLink.vue';
import EfSegmentList from '~/components/navigation/EfSegmentList.vue';

@Component({
  components: {
    EfLink,
    EfSegmentList,
  },
})
export default class TheFooter extends Vue {
  get navigation(): NavigationItem[] {
    return this.$store.getters['site/getFooter'].navigation;
  }

  get secondaryNavigation(): NavigationItem[] {
    return this.$store.getters['site/getFooter'].secondaryNavigation;
  }

  get segments(): Link[] {
    return this.$store.getters['site/getSegments'];
  }

  get legalLinks(): Link[] {
    return this.$store.getters['site/getLegalLinks'];
  }
}
</script>
<style scoped>
.footer {
  background-color: var(--color-sacramento-state);
  color: var(--color-white);
  margin-top: 50px;
  padding: 50px 15px;
}
</style>
