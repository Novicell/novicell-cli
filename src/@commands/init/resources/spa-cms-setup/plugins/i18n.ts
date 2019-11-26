import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default async ({ app }: { app: any }) => {
  let translations;
  try {
    // Get dictionaries from api
    const { data } = await app.$axios('/api/headless/dictionary/FetchAll', {
      method: 'get',
    });
    // Format the translations
    translations = data.reduce((obj: any, item: any) => {
      if (!item.translations) {
        return;
      }
      item.translations.forEach((translation: any) => {
        if (translation.value) {
          obj[translation.culture] = obj[translation.culture] || {};
          obj[translation.culture][item.key] = translation.value;
        }
      });

      return obj; // eslint-disable-line consistent-return
    }, {});
  } catch (error) {
    translations = {
      da: {},
    };
  }

  app.i18n = new VueI18n({
    locale: 'da-DK',
    fallbackLocale: 'da-DK',
    messages: translations,
  });
};
