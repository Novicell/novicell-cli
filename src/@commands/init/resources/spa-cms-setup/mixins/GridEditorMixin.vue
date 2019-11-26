<script lang="ts">
import Vue from 'vue';
import { Prop } from 'nuxt-property-decorator';

export default class extends Vue {
  @Prop({
    default: {},
  })
  viewModel!: any;

  @Prop({
    default: 12,
  })
  size!: number;
}
</script>
