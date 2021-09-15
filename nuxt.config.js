import colors from 'vuetify/es5/util/colors'

require('dotenv').config()

export default {
  mode: 'spa',
  build: {
    extend(config, ctx) {}, // blah blah
  },
  server: {
    host: '0.0.0.0',
    port: 3011,
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
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
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  serverMiddleware: [
    { path: '/verify', handler: '~/api/user.js' },
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/axios', mode: 'server' },
    '~/plugins/paymentsApi',
    '~/plugins/cardsApi',
    '~/plugins/marketplaceApi',
    '~/plugins/chargebacksApi',
    '~/plugins/settlementsApi',
    '~/plugins/walletsApi',
    '~/plugins/transfersApi',
    '~/plugins/addressesApi',
    '~/plugins/payoutsApi',
    '~/plugins/wiresApi',
    '~/plugins/achApi',
    '~/plugins/mocksApi',
    '~/plugins/businessAccount/addressesApi',
    '~/plugins/businessAccount/balancesApi',
    '~/plugins/businessAccount/bankAccountsApi',
    '~/plugins/businessAccount/depositsApi',
    '~/plugins/businessAccount/payoutsApi',
    '~/plugins/businessAccount/transfersApi',
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify', '@nuxtjs/dotenv'],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios', '@nuxtjs/auth', '@nuxtjs/auth-next'],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: colors.teal.lighten1,
          accent: colors.cyan.lighten1,
          secondary: colors.teal.lighten3,
          info: colors.teal.lighten3,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer',
        },
        user: {
          property: 'user',
          autoFetch: true,
        },
        endpoints: {
          login: {
            url: '/api/test',
            method: 'post',
            propertyName: 'token',
          },
          logout: {
            url: 'api/auth/logout',
            method: 'post',
          },
          user: {
            url: 'api/auth/user',
            method: 'get',
          },
          tokenRequired: false,
        },
      },
    },
    redirect: {
      login: '/auth/login',
      logout: '/',
      callback: '/auth/login',
      home: '/',
    },
  },

  axios: {
    baseURL: 'localhost/api/test',
    browserBaseURL: '/',
  },
  
  /*
   ** Build configuration
   */
  build: {
    extend(config, { isClient, isDev }) {
      // Extend only webpack config for client-bundle
      if (isDev && isClient) {
        config.devtool = 'source-map'
      }
      if (!config.optimization.splitChunks.cacheGroups) {
        config.optimization.splitChunks.cacheGroups = {
          vendor: {
            test: /[\\/]node_modules\/openpgp[\\/]/,
            name: 'openpgp',
            chunks: 'all',
          },
        }
      }
    },
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://api.circle.com',
  },
}
