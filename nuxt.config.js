module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'albion-profit-calculator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Albion profit calculator' }
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
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/dotenv'],
  /**
   * Modules
   */
  modules: [
    [
      'nuxt-i18n',
      {
        locales: ['en', 'ru'],
        defaultLocale: 'en',
        vueI18nLoader: true,
        vueI18n: {
          fallbackLocale: 'en',
        },
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected'
        }
      },
      '@nuxtjs/dotenv',
      '@nuxtjs/axios',
      '@nuxtjs/auth'
    ]
  ],
  serverMiddleware: [
    //'~/api/logger'
    // body-parser middleware
    // Api middleware
    // We add /api/login & /api/logout routes
    { path: '/api', handler: '~/api/logger.js' },
  ],
  plugins: [{ 
    src: "@/plugins/vClickOutside", 
    ssr: false 
  }]
}

