// Canonical URLs always point to production, whatever host serves the build
export const SITE_URL = 'https://problemas.hu'
export const AUTHOR_NAME = 'Mile Ferenc'
// The same name in English order, as the English profile writes it
const authorAlternateName = 'Ferenc Mile'

const websiteId = `${SITE_URL}/#website`
const personId = `${SITE_URL}/#person`
const profileUrl = `${SITE_URL}/rolam/`

export type PageKind = 'home' | 'profile' | 'article' | 'page'
export type PageLanguage = 'hu' | 'en'

export interface StructuredPage {
  kind: PageKind
  url: string
  /** Hungarian when not set */
  language?: PageLanguage
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
  const language = page.language ?? 'hu'
  // Only these pages state the current role where the visitor can read it
  const showsRole = isHome || page.url === profileUrl

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      'url': `${SITE_URL}/`,
      'name': 'problemas.hu',
      'inLanguage': ['hu', 'en'],
      'publisher': { '@id': personId },
    },
    {
      '@type': 'Person',
      '@id': personId,
      'name': AUTHOR_NAME,
      'alternateName': authorAlternateName,
      'url': profileUrl,
      'mainEntityOfPage': { '@id': `${profileUrl}#webpage` },
      'sameAs': author.sameAs,
      ...(showsRole && { jobTitle: author.jobTitle }),
      ...(page.knowsAbout && { knowsAbout: page.knowsAbout }),
      ...(isProfile && { description: page.description }),
    },
    {
      '@type': isProfile ? 'ProfilePage' : 'WebPage',
      '@id': webPageId,
      'url': page.url,
      'name': page.title,
      'description': page.description,
      'inLanguage': language,
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
        { '@type': 'ListItem', 'position': 1, 'name': language === 'en' ? 'Home' : 'Főoldal', 'item': `${SITE_URL}/` },
        { '@type': 'ListItem', 'position': 2, 'name': page.heading, 'item': page.url },
      ],
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}
