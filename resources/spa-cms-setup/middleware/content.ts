import { Middleware } from '@nuxt/types';
import { formatPath } from '~/helpers';
import { Page } from '~/types';

const contentMiddleware: Middleware = async (ctx: any) => {
  // Wrap in a try catch, and throw a 500 if something goes wrong on the request
  try {
    const { fullPath } = ctx.route;
    const host = ctx.env.baseUrl;
    const path = host + fullPath;
    const url = formatPath(path);
    const req = await ctx.app.$contentApi.getContentByUrl(url);
    const page: Page = req.data;
    const { meta, content, seo, hero } = page;

    if (!meta) {
      throw new Error('No meta provided');
    }

    const redirect = meta.redirectUrl || '';
    switch (meta.statusCode) {
      case 301:
        return ctx.redirect(301, redirect);
      case 404:
        return ctx.error({ statusCode: meta.statusCode });
      default:
        break;
    }

    const payload: Page = {
      seo,
      meta,
      content,
      hero,
    };
    ctx.payload = payload;

    return ctx;
  } catch (error) {
    return ctx.error({ statusCode: 500, message: 'Something went wrong' });
  }
};

export default contentMiddleware;
