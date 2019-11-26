<template>
  <nav>
    <ul class="segment-list">
      <li v-for="segment in segments" :key="segment.url" class="segment-list__item">
        <ef-link :to="segment.url" :blank="segment.target" class="segment-link">
          {{ segment.name }}
        </ef-link>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { Link } from '~/types';
import EfLink from '~/components/common/EfLink.vue';

@Component({
  components: {
    EfLink,
  },
})
export default class EfSegmentList extends Vue {
  @Prop({
    default: [],
  })
  segments!: Link[];
}
</script>
<style scoped>
.segment-list {
  font-family: var(--alternative-font-family);
  border-bottom: 1px solid #147458;
  font-style: italic;
  font-size: 1.125em;
  list-style-type: none;
  margin: 0 0 1em;
  padding: 0;
  display: flex;

  &__item {
    display: block;
    position: relative;
    &:nth-of-type(1) {
      color: var(--color-mikado-yellow);
    }
    &:nth-of-type(2) {
      color: var(--color-green);
    }
    &:nth-of-type(3) {
      color: var(--color-honey-dew);
    }
  }
}

.segment-link {
  text-decoration: none;
  padding: 22px 38px 17px;
  display: block;
  position: relative;
  margin-bottom: -3px;
  border-bottom: 5px solid transparent;

  &.nuxt-link-active {
    border-bottom-color: var(--color-white);
  }

  &:hover {
    border-bottom-color: rgba(255, 255, 255, 0.5);
  }
}
</style>
