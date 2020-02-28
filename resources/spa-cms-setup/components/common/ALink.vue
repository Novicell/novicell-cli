<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { CreateElement, VNode } from 'vue';

@Component({
  components: {},
})
export default class Link extends Vue {
  @Prop() to!: string;

  @Prop() name!: string;

  @Prop({
    default: '_self',
  })
  target!: string;

  public render(h: CreateElement): VNode {
    if (isExternal(this.to)) {
      return h(
        'a',
        {
          attrs: {
            href: this.to,
            target: this.target,
            rel: 'noopener noreferrer',
            'aria-label': this.name,
          },
        },
        this.$slots.default,
      );
    }

    return h(
      'n-link',
      {
        attrs: {
          'aria-label': this.name,
        },
        props: {
          target: this.target,
          to: this.to,
        },
      },
      this.$slots.default,
    );
  }
}

// Small helper for detection of external links
function isExternal(url: string) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return pattern.test(url);
}
</script>

<style scoped>
* {
  color: inherit;
}
</style>
