<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { VNode, CreateElement } from 'vue';
import { GridEditor } from '~/types';

const components: any = {
  rte: () => import('~/components/grid/editors/EfRte.vue'),
  textAndImage: () => import('~/components/grid/editors/EfTextAndImage.vue'),
  shortcuts: () => import('~/components/grid/editors/EfShortcuts.vue'),
  contentSlider: () => import('~/components/grid/editors/EfDebug.vue'),
  customerCenter: () => import('~/components/grid/editors/EfDebug.vue'),
  iconLinks: () => import('~/components/grid/editors/EfDebug.vue'),
  newsList: () => import('~/components/grid/editors/EfDebug.vue'),
  productHighlight: () => import('~/components/grid/editors/EfDebug.vue'),
  productList: () => import('~/components/grid/editors/EfDebug.vue'),
};

@Component({
  components,
})
export default class GridColumn extends Vue {
  @Prop({
    default: {},
  })
  column!: GridEditor;

  get viewModel() {
    return this.column.viewModel;
  }

  get columns() {
    return this.column.column;
  }

  get alias() {
    return this.column.alias;
  }

  public render(h: CreateElement): VNode {
    if (!components[this.alias]) {
      console.log(`No render for ${this.alias}`); // eslint-disable-line no-console
      return h();
    }

    const className = `grid-column col-xs-12 col-ms-${this.columns}`;

    // Render the component with a wrapper containing the column classes
    return h(
      'div',
      {
        attrs: {
          class: className,
        },
      },
      [
        h(this.alias, {
          props: {
            viewModel: this.viewModel,
            size: this.columns,
          },
        }),
      ],
    );
  }
}
</script>
<style scoped>
.grid-column {
  margin-bottom: 25px;
}
</style>
