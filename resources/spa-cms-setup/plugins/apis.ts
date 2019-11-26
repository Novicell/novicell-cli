import contentApi from '~/api/content.api';

export default (ctx: any, inject: any) => {
  inject('contentApi', contentApi(ctx.$axios));
};
