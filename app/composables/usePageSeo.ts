// The two profiles are language versions of each other
const profilePaths = { hu: '/rolam/', en: '/en/' }

// Site-wide defaults in nuxt.config.ts are Hungarian
const english = {
  ogLocale: 'en_GB',
  image: `${SITE_URL}/og-mile-ferenc-en.png`,
  imageAlt: 'Mile Ferenc. Technology, people, systems. Problems we have learned to accept. problemas.hu',
}

/** Meta tags, canonical URL and structured data of a content page. */
export function usePageSeo(page: Omit<StructuredPage, 'url'> & { path: string }) {
  const { profiles, jobTitle } = useAppConfig()
  // The path comes without a trailing slash, the site serves every page with one
  const url = `${SITE_URL}${page.path === '/' ? '' : page.path}/`
  const ogType = ({ home: 'website', profile: 'profile', article: 'article', page: 'website' } as const)[page.kind]

  const isEnglish = page.language === 'en'
  const hasTranslation = Object.values(profilePaths).includes(new URL(url).pathname)

  useSeoMeta({
    title: page.title,
    description: page.description,
    robots: 'index, follow, max-image-preview:large',
    ogTitle: page.title,
    ogDescription: page.description,
    ogUrl: url,
    ogType,
    articlePublishedTime: page.datePublished,
    articleModifiedTime: page.dateModified,
    twitterTitle: page.title,
    twitterDescription: page.description,
    ...(isEnglish && {
      ogLocale: english.ogLocale,
      ogImage: english.image,
      ogImageAlt: english.imageAlt,
      twitterImage: english.image,
      twitterImageAlt: english.imageAlt,
    }),
  })

  useHead({
    ...(isEnglish && { htmlAttrs: { lang: 'en' } }),
    link: [
      { rel: 'canonical', href: url },
      ...(hasTranslation
        ? Object.entries(profilePaths).map(([hreflang, path]) => ({ rel: 'alternate' as const, hreflang, href: `${SITE_URL}${path}` }))
        : []),
    ],
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify(
        structuredData({ ...page, url }, { jobTitle, sameAs: profiles.map(profile => profile.url) }),
      ).replace(/</g, '\\u003c'),
    }],
  })
}
