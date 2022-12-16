export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: process.env.VUE_APP_TITLE,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&display=swap' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/global.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/../bib-shared/js/colors.js', '~/../bib-shared/js/plugins.js',],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: [
    { path: '~/components/', pathPrefix: false },
    { path: '~/../bib-shared/components/', pathPrefix: false }
  ],

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // Simple usage
    'cookie-universal-nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    
  ],
  axios: {
    // proxy: true,
    baseURL: process.env.VUE_APP_API_ENDPOINT,
  },
  
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [],
  styleResources: {
    scss: [
      '../bib-shared/css/global.scss'
    ]
  },
 
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: null,
    vendor: ['aframe'],
    extend(config, { loaders }) {
      loaders.scss.additionalData = '@use "sass:math";'
    }
  },
  target: 'static',
  ssr: false
 
}
