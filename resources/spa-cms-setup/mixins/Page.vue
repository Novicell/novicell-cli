<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import GridRow from '~/components/grid/GridRow.vue';

@Component({
  components: {
    GridRow,
  },
})
export default class Page extends Vue {
  @Prop() content!: any;

  get grid() {
    return this.content.content.gridContent || {};
  }
}
</script>
