/** Meta tags, canonical URL and structured data of a content page. */
export function usePageSeo(page: Omit<StructuredPage, 'url'> & { path: string }) {
  const { profiles, jobTitle } = useAppConfig()
  // The path comes without a trailing slash, the site serves every page with one
  const url = `${SITE_URL}${page.path === '/' ? '' : page.path}/`
  const ogType = ({ home: 'website', profile: 'profile', article: 'article', page: 'website' } as const)[page.kind]

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
  })

  useHead({
    link: [{ rel: 'canonical', href: url }],
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify(
        structuredData({ ...page, url }, { jobTitle, sameAs: profiles.map(profile => profile.url) }),
      ).replace(/</g, '\\u003c'),
    }],
  })
}
