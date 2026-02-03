// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxt/ui',
  ],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',

  // SSG configuration
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
  },

  // HTML lang attribute
  app: {
    head: {
      htmlAttrs: {
        lang: 'hu',
      },
      title: 'problemas.hu - Társadalmi problémák elemzése',
      meta: [
        { name: 'description', content: 'Társadalmi problémák elemzése és fokozatos megoldási javaslatok' },
        { property: 'og:title', content: 'problemas.hu' },
        { property: 'og:description', content: 'Társadalmi problémák elemzése és fokozatos megoldási javaslatok' },
        { property: 'og:type', content: 'website' },
      ],
    },
  },
})