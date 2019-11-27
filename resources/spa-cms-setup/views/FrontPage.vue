<template>
  <div class="frontpage-page">
    <div class="content">
      <grid-row v-for="(row, index) in grid.rows" :key="index" :row="row" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator';
import Page from '~/mixins/Page.vue';

@Component({})
export default class FrontPageTemplate extends Page {}
</script>

<style scoped></style>
