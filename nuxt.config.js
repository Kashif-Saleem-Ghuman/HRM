import i18n from "./config/i18n";

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: process.env.VUE_APP_TITLE,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&display=swap",
      },
      {
        rel: "stylesheet",
        href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ],
  },

  router: {
    middleware: ['redirects']
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~/assets/global.scss"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["~/plugins/plugins", "~/plugins/logout", "~/plugins/button"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: [
    { path: "~/components/", pathPrefix: false },
    // { path: '~/../bib-shared/components/', pathPrefix: false }
  ],
  
  buildModules: [
    // Simple usage
    "cookie-universal-nuxt",
    "@nuxtjs/axios",
    '@nuxtjs/dotenv',
    "@nuxtjs/style-resources",
    "dayjs",
    [
      "nuxt-i18n",
      {
        vueI18nLoader: true,
        defaultLocale: "en",
        locales: [
          {
            code: "en",
            name: "English",
            file: "global_en.json"
          },
          {
            code: "fr",
            name: "Français",
            file: "global_fr.json"
          }
        ],
        globalInjection: true,
        vueI18n: i18n,
        langDir: "~/node_modules/@bizinbox/bib-ui-lib/dist/lang"
      }
    ],
  ],
  axios: {
    // proxy: true,
    baseURL: process.env.VUE_APP_API_ENDPOINT,
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // { path: "~/modules/fullcalendar/vue", pathPrefix: false },
    // '~/modules/@fullcalendar/vue',
    // '~/modules/@fullcalendar/daygrid',
    // '~/modules/@fullcalendar/interaction',

  ],
  styleResources: {
    scss: [
      // '../bib-shared/css/global.scss',
      "~/node_modules/@bizinbox/bib-ui-lib/dist/utilities.scss",
    ],
  },
  
  // serverMiddleware: ["~/middleware/redirects"],
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: null,
    vendor: ["aframe"],
    extend(config, { loaders }) {
      loaders.scss.additionalData = '@use "sass:math";';
    },
  },
  target: "static",
  ssr: false,
};
