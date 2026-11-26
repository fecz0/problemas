// Canonical URLs always point to production, whatever host serves the build
export const SITE_URL = 'https://problemas.hu'
export const AUTHOR_NAME = 'Mile Ferenc'

const websiteId = `${SITE_URL}/#website`
const personId = `${SITE_URL}/#person`
const profileUrl = `${SITE_URL}/rolam/`

export type PageKind = 'home' | 'profile' | 'article' | 'page'

export interface StructuredPage {
  kind: PageKind
  url: string
  /** Document title */
  title: string
  /** Visible page heading */
  heading: string
  description: string
  datePublished?: string
  dateModified?: string
  /** Topics the page visibly lists for the author */
  knowsAbout?: string[]
}

export function structuredData(page: StructuredPage, author: { jobTitle: string, sameAs: string[] }) {
  const webPageId = `${page.url}#webpage`
  const breadcrumbId = `${page.url}#breadcrumb`
  const isHome = page.kind === 'home'
  const isProfile = page.kind === 'profile'

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      'url': `${SITE_URL}/`,
      'name': 'problemas.hu',
      'inLanguage': 'hu',
      'publisher': { '@id': personId },
    },
    {
      '@type': 'Person',
      '@id': personId,
      'name': AUTHOR_NAME,
      'url': profileUrl,
      'mainEntityOfPage': { '@id': `${profileUrl}#webpage` },
      'sameAs': author.sameAs,
      // Only where the visitor can read the role on the page
      ...((isHome || isProfile) && { jobTitle: author.jobTitle }),
      ...(page.knowsAbout && { knowsAbout: page.knowsAbout }),
      ...(isProfile && { description: page.description }),
    },
    {
      '@type': isProfile ? 'ProfilePage' : 'WebPage',
      '@id': webPageId,
      'url': page.url,
      'name': page.title,
      'description': page.description,
      'inLanguage': 'hu',
      'isPartOf': { '@id': websiteId },
      ...(isHome && { about: { '@id': personId } }),
      ...(isProfile && { mainEntity: { '@id': personId } }),
      ...(!isHome && { breadcrumb: { '@id': breadcrumbId } }),
    },
  ]

  if (page.kind === 'article') {
    graph.push({
      '@type': 'Article',
      '@id': `${page.url}#article`,
      'headline': page.heading,
      'description': page.description,
      'datePublished': page.datePublished,
      'dateModified': page.dateModified,
      'inLanguage': 'hu',
      'author': { '@id': personId },
      'publisher': { '@id': personId },
      'mainEntityOfPage': { '@id': webPageId },
    })
  }

  if (!isHome) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Főoldal', 'item': `${SITE_URL}/` },
        { '@type': 'ListItem', 'position': 2, 'name': page.heading, 'item': page.url },
      ],
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}
