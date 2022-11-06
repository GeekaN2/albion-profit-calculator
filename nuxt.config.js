require('dotenv').config();
import path from 'path';
import i18n from './locales/i18n'

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Albion profit calculator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Albion profit calculator' },
      { name: 'google', content: 'notranslate' }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }, {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap'
      }
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
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
      svgRule.exclude = [path.resolve(__dirname, 'static/svg')]
      // Includes /icons/svg for svg-sprite-loader
      config.module.rules.push({
        test: /\.svg$/,
        include: [path.resolve(__dirname, 'static/svg')],
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        }
      })
    },
  },
  /**
   * Build typescript
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/dotenv', '@nuxtjs/color-mode'],
  /**
   * Modules
   */
  modules: [
    [
      'nuxt-i18n',
      {
        locales: [{
          code: 'en',
          file: 'en.js'
        }, {
          code: 'ru',
          file: 'ru.js'
        }],
        defaultLocale: 'en',
        vueI18nLoader: true,
        vueI18n: i18n,
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected'
        },
      }
    ],
    ['@nuxtjs/dotenv'],
    ['@nuxtjs/axios'],
    ['@nuxtjs/auth-next'],
    ['nuxt-clipboard2'],
    ['@nuxtjs/toast']
  ],
  plugins: [{
    src: '@/plugins/vClickOutside',
    ssr: false
  }, { 
    src: '@/plugins/icons', 
    ssr: true 
  }, {
    src: '@/plugins/vTooltip',
    ssr: false
  }, {
    src: '@/plugins/portalVue',
    ssr: false
  }],

  axios: {
    baseURL: process.env.BASE_URL
  },

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'token',
          maxAge: 60 * 30,
          // type: 'Bearer'
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refreshToken',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: { url: 'auth/login', method: 'post' },
          refresh: { url: 'auth/refresh', method: 'post' },
          user: { url: 'user', method: 'get' },
          logout: { url: 'auth/logout', method: 'post' }
        },
        autoLogout: false,
      },
    },
    redirect: false,
  },

  toast: {
    position: 'bottom-right',
    duration: 3000,
  }
}

