require('dotenv').config();

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
      { hid: 'description', name: 'description', content: 'Albion profit calculator' }
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
        vueI18n: i18n,
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected'
        }
      }
    ],
    ['@nuxtjs/dotenv'],
    ['@nuxtjs/axios'],
    ['@nuxtjs/auth-next'],
    ['nuxt-clipboard2']
  ],
  plugins: [{ 
    src: "@/plugins/vClickOutside", 
    ssr: false 
  }],

  axios: {
    baseURL: process.env.BASE_URL
  },

  auth: {
    localStorage: false,
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'token',
          maxAge: 60 * 15,
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
        autoLogout: false
      }
    }
  }
}

