module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'albion-profit-calculator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /**
   * Uses store
   */
  store: true,
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  /**
   * Build typescript
   */
  buildModules: ['@nuxt/typescript-build'],
  /**
   * Modules
   */
  modules: [
    [
      'nuxt-i18n',
      {
        locales: ['en', 'ru'],
        defaultLocale: 'en',
        vueI18n: {
          fallbackLocale: 'en',
          messages: {
            en: {
              greeting: 'Hello world!',
              settings: {
                settings: 'Settings',
                useJournals: 'Use journals',
                updateJournals: 'Update journal prices',
                updateItems: 'Update current item',
                updateResources: 'Update resource prices',
                craftFee: 'craft fee'
              }
            },
            ru: {
              greeting: 'Привет мир!',
              settings: {
                settings: 'Настройки',
                useJournals: 'Использовать журналы',
                updateJournals: 'Обновить цену журналов',
                updateItems: 'Обновить цену предметов',
                updateResources: 'Обновить цену ресурсов',
                craftFee: 'налог станка'
              }
            }
          }
        },
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected'
        }
      }
    ]
  ]
}

