<template>
  <div>
    {{ viewModel }}
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator';
import GridEditorMixin from '~/mixins/GridEditorMixin.vue';

@Component({})
export default class EfDebug extends GridEditorMixin {
  // SHOULD BE DELETED - ONLY FOR TESTING PURPOSE
}
</script>
<style></style>
