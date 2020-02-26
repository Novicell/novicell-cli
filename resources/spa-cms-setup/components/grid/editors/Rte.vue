<template>
  <div>
    <div class="rte" v-html="viewModel.text" />
  </div>
</template>

<script lang="ts">
/* eslint-disable no-underscore-dangle, no-plusplus */
import { Component, Watch } from 'nuxt-property-decorator';
import GridEditorMixin from '~/mixins/GridEditorMixin.vue';

@Component({
  components: {},
})
export default class EfRte extends GridEditorMixin {
  _links: any;

  @Watch('viewModel.text')
  onChildChanged() {
    this.contentUpdated();
  }

  mounted() {
    this.$nextTick(this.addListeners);
  }

  beforeDestroy() {
    this.removeListeners();
  }

  navigate(event: any) {
    let { target } = event;
    let i = 0;
    // Go throught 5 parents max to find a tag
    while (i < 5 && !(target instanceof HTMLAnchorElement) && target.parentNode) {
      target = target.parentNode;
      i++;
    }
    // If target is still not a link, ignore
    if (!(target instanceof HTMLAnchorElement)) return;
    const href = target.getAttribute('href');
    // Get link target, if local link, navigate with router link
    if (href && href[0] === '/') {
      event.preventDefault();
      this.$router.push(href);
    } else if ((this as any).$ga) {
      // If Google Analytics is activated & is external link
      // https://developers.google.com/analytics/devguides/collection/analyticsjs/events
      (this as any).$ga('send', 'event', 'Outbound Link', 'click', target.href);
    }
  }

  contentUpdated() {
    this.removeListeners();
    this.$nextTick(() => {
      this.addListeners();
    });
  }

  addListeners() {
    this._links = this.$el.getElementsByTagName('a');
    for (let i = 0; i < this._links.length; i++) {
      this._links[i].addEventListener('click', this.navigate, false);
    }
  }

  removeListeners() {
    for (let i = 0; i < this._links.length; i++) {
      this._links[i].removeEventListener('click', this.navigate, false);
    }
    this._links = [];
  }
}
</script>

<style scoped>
.rte {
}
</style>
