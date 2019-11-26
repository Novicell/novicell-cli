<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { CreateElement, VNode } from 'vue';
import { PageMeta, PageContent, PageSeo } from '../types';
import TheHero from '~/components/globals/TheHero.vue';

const templates: any = {
  EffrontPage: () => import('~/views/FrontPage.vue'),
  EftextPage: () => import('~/views/TextPage.vue'),
};

@Component({
  components: {
    ...templates,
    TheHero,
  },
  middleware: ['content'],
})
export default class IndexPage extends Vue {
  meta!: PageMeta;

  content!: PageContent;

  seo!: PageSeo;

  hero!: any;

  asyncData(ctx: any) {
    return ctx.payload;
  }

  public render(h: CreateElement): VNode {
    if (!this.meta.template) {
      console.error(`No render for ${this.meta.template}`); // eslint-disable-line no-console
      return h();
    }

    const template = `Ef${this.meta.template}`;
    if (!templates[template]) {
      console.error(`No render for ${template}`); // eslint-disable-line no-console
      return h();
    }

    const page = h(template, {
      props: {
        content: this.content,
      },
    });
    const hero =
      this.hero && this.hero.backgroundImage
        ? h('TheHero', {
            props: {
              viewModel: this.hero,
            },
          })
        : h();

    return h('main', {}, [hero, page]);
  }

  public head() {
    if (!this.seo) {
      return {};
    }

    let robots = this.seo.index ? this.seo.index : '';
    if (robots && robots !== '') {
      robots += ',';
    }
    robots += this.seo.follow ? this.seo.follow : '';

    return {
      title: this.seo.title || '',
      link: [
        {
          rel: 'canonical',
          href: this.seo.canonical,
        },
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.seo.description || '',
        },
        { hid: 'keywords', name: 'keywords', content: this.seo.keywords || '' },
        { hid: 'robots', name: 'robots', content: robots },
        { hid: 'og:title', name: 'og:title', content: this.seo.title || '' },
      ],
    };
  }

  mounted() {
    if (this.meta) {
      this.$store.dispatch('navigation/SET_PATH', { path: this.meta.path });
    }
  }
}
</script>
