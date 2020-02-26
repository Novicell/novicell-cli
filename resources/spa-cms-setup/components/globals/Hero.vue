<template>
  <div class="hero">
    <Image :image="viewModel.backgroundImage" :is-background="true" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import Image from '~/components/common/Image.vue';

@Component({
  components: {
    Image,
  },
})
export default class TheHero extends Vue {
  @Prop({
    default: {},
  })
  viewModel!: any;
}
</script>

<style>
.hero {
  background-color: #e3e3e3;
  width: 100%;
  height: 400px;
}
</style>
