<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { VNode, CreateElement } from 'vue';
import { IGridEditor } from '~/types';

const components: any = {
  rte: () => import('~/components/grid/editors/Rte.vue'),
  textAndImage: () => import('~/components/grid/editors/TextAndImage.vue'),
  shortcuts: () => import('~/components/grid/editors/Shortcuts.vue'),
  contentSlider: () => import('~/components/grid/editors/Debug.vue'),
  customerCenter: () => import('~/components/grid/editors/Debug.vue'),
  iconLinks: () => import('~/components/grid/editors/Debug.vue'),
  newsList: () => import('~/components/grid/editors/Debug.vue'),
  productHighlight: () => import('~/components/grid/editors/Debug.vue'),
  productList: () => import('~/components/grid/editors/Debug.vue'),
};

@Component({
  components,
})
export default class GridColumn extends Vue {
  @Prop({
    default: {},
  })
  column!: IGridEditor;

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
