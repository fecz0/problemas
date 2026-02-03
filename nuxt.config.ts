// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/sitemap',
  ],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',

  typescript: {
    strict: true,
  },

  // SSG configuration
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/', '/404.html'],
      crawlLinks: true,
      ignore: [
        '/.well-known/**',
        '/_nuxt/**',
      ],
    },
  },

  // Route rules - ignore special paths from catch-all
  routeRules: {
    '/.well-known/**': { prerender: false },
  },

  site: {
    url: 'https://problemas.hu',
  },

  router: {
    options: {
      trailingSlash: true,
    },
  },

  sitemap: {
    zeroRuntime: true
  },

  // HTML lang attribute and default SEO
  app: {
    head: {
      htmlAttrs: {
        lang: 'hu',
      },
      titleTemplate: '%s',
      meta: [
        { name: 'author', content: 'problemas.hu' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:locale', content: 'hu_HU' },
        { property: 'og:site_name', content: 'problemas.hu' },
        { property: 'og:image', content: 'https://problemas.hu/problemas-background.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://problemas.hu/problemas-background.png' },
        { name: 'apple-mobile-web-app-title', content: 'Problémás' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
})