// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/sitemap',
  ],
  css: ['~/assets/css/main.css'],

  // Fonts and icons are bundled at build time, so visitors make no third-party requests
  fonts: {
    defaults: {
      subsets: ['latin', 'latin-ext'],
      styles: ['normal'],
    },
    families: [
      { name: 'Inter', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Space Grotesk', provider: 'google', weights: [500, 700] },
      { name: 'IBM Plex Mono', provider: 'google', weights: [400, 600] },
    ],
  },
  icon: {
    clientBundle: { scan: true },
    fallbackToApi: false,
  },

  content: {
    // Node's built-in SQLite, no native dependency to compile
    experimental: { sqliteConnector: 'native' },
    build: {
      markdown: {
        rehypePlugins: {
          'rehype-external-links': {
            options: { target: '_blank', rel: ['noopener', 'noreferrer'] },
          },
        },
      },
    },
  },

  devtools: { enabled: true },
  compatibilityDate: '2026-11-26',

  // SSG configuration
  nitro: {
    prerender: {
      routes: ['/', '/rolam/', '/szemleletem/', '/404.html'],
      crawlLinks: true,
      ignore: [
        '/.well-known/**',
        '/_nuxt/**',
      ],
    },
  },

  site: {
    url: 'https://problemas.hu',
    trailingSlash: true,
  },

  experimental: {
    // Render 404.html at build time, so it is readable without JavaScript
    prerenderErrorPages: true,
    defaults: {
      nuxtLink: {
        trailingSlash: 'append',
      },
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
      meta: [
        { name: 'author', content: 'Mile Ferenc' },
        { property: 'og:locale', content: 'hu_HU' },
        { property: 'og:site_name', content: 'problemas.hu' },
        { property: 'og:image', content: 'https://problemas.hu/problemas-background.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '634' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://problemas.hu/problemas-background.png' },
        { name: 'apple-mobile-web-app-title', content: 'Problémás' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
})