<template>
  <div class="textpage-page">
    <div class="content">
      <grid-row v-for="(row, index) in grid.rows" :key="index" :row="row" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator';
import Page from '~/mixins/Page.vue';

@Component({
  components: {},
})
export default class TextPageTemplate extends Page {}
</script>

<style scoped></style>
