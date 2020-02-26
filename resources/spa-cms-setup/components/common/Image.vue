<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { CreateElement, VNode } from 'vue';
import { ImageSize, Image } from '~/types';

@Component({
  inheritAttrs: false,
})
export default class Image extends Vue {
  staticClass: string = '';

  @Prop({
    default: false,
  })
  isBackground!: boolean;

  @Prop() image!: Image;

  @Prop() heightRatio!: number;

  @Prop() imageHeight!: number;

  @Prop({
    default: () => [],
  })
  sizes!: ImageSize[];

  public render(h: CreateElement): VNode {
    if (!this.image) {
      return h();
    }

    let className = 'lazyload';

    if (this.$vnode.data && this.$vnode.data.staticClass) {
      className += ` ${this.$vnode.data.staticClass}`;
    }

    const tag = 'img';
    if (this.isBackground) {
      className += ' lazyload-bg';
    }

    if (!this.sizes.length) {
      className += ' lazyload-measure';
    }

    const dataQuery: any = {
      mode: 'crop',
      quality: '80',
      center: '0.5%2C0.5',
    };

    if (this.imageHeight) {
      dataQuery.height = this.imageHeight;
    }

    if (this.image.focalPoint && this.image.focalPoint.top && this.image.focalPoint.left) {
      dataQuery.center = `${this.image.focalPoint.top}%2C${this.image.focalPoint.left}`;
    }

    this.staticClass = className || '';

    const attrs: any = {
      class: className,
      'data-src': this.url,
      'data-query-obj': JSON.stringify(dataQuery),
    };

    if (this.imageSizes) {
      attrs['data-sizes'] = 'auto';
      attrs['data-srcset'] = this.imageSizes;
    }

    if (this.heightRatio != null) {
      attrs['data-height-ratio'] = this.heightRatio;
    }

    if (this.image.altText) {
      attrs.alt = this.image.altText;
    }

    if (this.image.title) {
      attrs.title = this.image.title;
    }

    return h(
      tag,
      {
        attrs,
      },
      this.$slots.default,
    );
  }

  mounted() {
    this.$el.setAttribute('class', this.staticClass);
  }

  get url() {
    if (!this.image) {
      return null;
    }
    const { url } = this.image;
    return url;
  }

  get imageSizes() {
    if (!this.image) {
      return null;
    }

    const { url } = this.image;
    return this.sizes
      .reduce((arr: string[], currentValue: ImageSize) => {
        const str = `${url}?width=${currentValue.imageWidth} ${currentValue.windowWidth ? `${currentValue.windowWidth}w` : ''}`;
        arr.push(str);
        return arr;
      }, [])
      .join(', ');
  }
}
</script>
<style scoped>
img {
  width: 100%;
  height: auto;
  max-height: 100%;
  flex-shink: 0;
  transition: opacity 0.2s ease-in;

  &.lazyload:not([src]) {
    opacity: 0;
    visibility: hidden;
  }

  &.lazyloaded {
    opacity: 1;
  }

  &.lazyload-bg {
    opacity: 0;
    visibility: hidden;
    width: 0;
    height: 0;
  }
}
</style>
