<template>
  <div class="grid-row">
    <div class="grid-row__background" :style="style" />
    <div class="container">
      <div class="row">
        <grid-column v-for="(column, index) in columns" :key="index" :column="column" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { GridRowModel } from '~/types';
import GridColumn from '~/components/grid/GridColumn.vue';

@Component({
  components: {
    GridColumn,
  },
})
export default class GridRow extends Vue {
  @Prop({
    default: {},
  })
  row!: GridRowModel;

  get columns() {
    return this.row.editors;
  }

  get style(): string {
    return '';
  }
}
</script>
<style scoped>
.grid-row {
  margin-bottom: 30px;

  @media only screen and (--viewport-sm-min) {
    margin-bottom: 50px;
  }

  &__background {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    z-index: -1;
  }
}
</style>
