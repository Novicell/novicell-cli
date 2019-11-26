const postcssCustomMedia = require('postcss-custom-media');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssReporter = require('postcss-reporter');
const postcssNested = require('postcss-nested');
const postcssCalc = require('postcss-calc');

require('dotenv').config();

module.exports = {
  env: {
    baseUrl: process.env.BASE_URL,
    apiUrl: process.env.API_URL,
    NODE_ENV: process.env.NODE_ENV || 'development',
  },
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  loading: { color: '#00543B' },
  buildModules: ['@nuxtjs/eslint-module', '@nuxt/typescript-build'],
  css: [{ src: '~assets/css/master.css' }],
  build: {
    extractCSS: true,
    optimizeCSS: true,
    postcss: {
      plugins: [
        postcssImport(),
        postcssCustomMedia({
          importFrom: 'assets/css/_mediaqueries.css',
        }),
        postcssPresetEnv({
          stage: 2, // default stage is 2
          preserve: false,
          autoprefixer: {
            grid: true,
          },
          features: {
            'color-mod-function': { unresolved: 'warn' },
            'custom-media-queries': {},
          },
          browsers: ['>= 5% in DK', 'ie 11'],
        }),
        postcssNested(),
        postcssCalc(),
        postcssReporter({
          clearReportedMessages: true,
        }),
      ],
    },
    babel: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
      ],
    },
  },
  modules: ['@nuxtjs/axios'],
  axios: {
    baseURL: process.env.API_URL,
  },
  plugins: ['~/plugins/i18n', '~/plugins/apis', '~/plugins/lazyload.client'],
  router: {
    prefetchLinks: false,
    trailingSlash: true,
    extendRoutes(routes, resolve) {
      routes.splice(0, routes.length);
      routes.push({
        name: 'content',
        path: '*',
        component: resolve(__dirname, 'pages/index.vue'),
      });
    },
  },
};
