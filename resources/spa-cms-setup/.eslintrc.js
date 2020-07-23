module.exports = {
  ignorePatterns: ['nuxt.config.js'],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['@nuxtjs', 'airbnb-base'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'linebreak-style': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'no-use-before-define': 0,
    'no-shadow': 0,
    'no-param-reassign': 'off',
    'class-methods-use-this': 0,
    'max-len': [
      'error',
      170,
      1,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'vue/no-v-html': 'off',
    'import/extensions': 'off',
  },
};
