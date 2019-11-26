<template>
  <div>
    <the-header />
    <nuxt />
    <the-footer />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import TheHeader from '~/components/globals/TheHeader.vue';
import TheFooter from '~/components/globals/TheFooter.vue';

@Component({
  components: {
    TheHeader,
    TheFooter,
  },
})
export default class DefaultLayout extends Vue {}
</script>
