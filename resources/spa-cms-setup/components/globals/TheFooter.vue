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
              <ALink :to="item.url" :blank="item.target">
                {{ item.name }}
              </ALink>
            </li>
          </ul>
        </div>
        <div class="col-xs-12 col-md-3">
          <ul>
            <li v-for="item in secondaryNavigation" :key="item.id">
              <ALink :to="item.url" :blank="item.target">
                {{ item.name }}
              </ALink>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <ul>
            <li v-for="item in legalLinks" :key="item.id">
              <ALink :to="item.url" :blank="item.target">
                {{ item.name }}
              </ALink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { I_NavigationItem, I_Link } from '~/types';
import ALink from '~/components/common/ALink.vue';
import SegmentList from '~/components/navigation/SegmentList.vue';

@Component({
  components: {
    ALink,
    SegmentList,
  },
})
export default class TheFooter extends Vue {
  get navigation(): I_NavigationItem[] {
    return this.$store.getters['site/getFooter'].navigation;
  }

  get secondaryNavigation(): I_NavigationItem[] {
    return this.$store.getters['site/getFooter'].secondaryNavigation;
  }

  get segments(): I_Link[] {
    return this.$store.getters['site/getSegments'];
  }

  get legalLinks(): I_Link[] {
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
