<template>
  <div class="error-page">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 text-center">
          <h1>{{ headline }}</h1>
          <p>{{ description }}</p>
          <ef-link to="/" class="button error-page__link">
            {{ linkText }}
          </ef-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import EfLink from '~/components/common/EfLink.vue';
import GridRow from '~/components/grid/GridRow.vue';

@Component({
  components: {
    EfLink,
    GridRow,
  },
})
export default class ErrorLayout extends Vue {
  @Prop() error!: any;

  get statusCode() {
    return this.error.statusCode;
  }

  get headline() {
    return (this as any).$t('Pages.ErrorPage.Headline');
  }

  get description() {
    return (this as any).$t('Pages.ErrorPage.Description');
  }

  get linkText() {
    return (this as any).$t('Pages.ErrorPage.GoToFrontpage');
  }

  head() {
    return {
      title: this.error.statusCode,
    };
  }
}
</script>

<style scoped>
.error-page {
}
</style>
