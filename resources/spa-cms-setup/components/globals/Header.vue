<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <the-navigation />
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import TheNavigation from '~/components/globals/TheNavigation.vue';

@Component({
  components: {
    TheNavigation,
  },
})
export default class TheHeader extends Vue {}
</script>

<style scoped>
.header {
  padding: 20px;
  color: var(--color-text);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}
</style>
