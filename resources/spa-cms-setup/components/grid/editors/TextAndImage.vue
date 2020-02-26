<template>
  <div class="text-and-image row">
    <div class="text-and-image__content col-xs-12 col-sm-6">
      <h2 v-if="viewModel.headline" class="text-and-image__headline">
        {{ viewModel.headline }}
      </h2>

      <ef-rte :view-model="viewModel" />
    </div>
    <div v-if="viewModel.image" class="text-and-image__image col-xs-12 col-sm-6">
      <Image :image="viewModel.image" :height-ratio="0" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator';
import GridEditorMixin from '~/mixins/GridEditorMixin.vue';
import Rte from '~/components/grid/editors/Rte.vue';
import Image from '~/components/common/Image.vue';

@Component({
  components: {
    Rte,
    Image,
  },
})
export default class EfTextAndImage extends GridEditorMixin {}
</script>
<style scoped>
.text-and-image {
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}
</style>
