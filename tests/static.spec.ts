// Checks the generated HTML the way a crawler without JavaScript sees it
import { test, expect, type Page } from '@playwright/test'

const SITE = 'https://problemas.hu'
const PERSON = `${SITE}/#person`

const pages = [
  { path: '/', type: 'website', schema: ['WebSite', 'Person', 'WebPage'] },
  { path: '/rolam/', type: 'profile', schema: ['WebSite', 'Person', 'ProfilePage', 'BreadcrumbList'] },
  { path: '/szemleletem/', type: 'website', schema: ['WebSite', 'Person', 'WebPage', 'BreadcrumbList'] },
  { path: '/problemak/haziorvosi-recept-1/', type: 'article', schema: ['WebSite', 'Person', 'WebPage', 'Article', 'BreadcrumbList'] },
  { path: '/en/', type: 'profile', lang: 'en', schema: ['WebSite', 'Person', 'ProfilePage', 'BreadcrumbList'] },
]

interface Node {
  '@type': string
  '@id': string
  [key: string]: unknown
}

const meta = (page: Page, key: string) =>
  page.locator(`meta[name="${key}"], meta[property="${key}"]`).getAttribute('content')

async function graph(page: Page): Promise<Node[]> {
  const scripts = page.locator('script[type="application/ld+json"]')
  await expect(scripts).toHaveCount(1)
  return JSON.parse((await scripts.textContent())!)['@graph']
}

test.use({ javaScriptEnabled: false })

test.describe('Static HTML', () => {
  for (const { path, type, schema, lang = 'hu' } of pages) {
    test(`describes ${path} for search and sharing`, async ({ page }) => {
      await page.goto(path)
      const url = `${SITE}${path}`
      const title = await page.title()
      const description = await meta(page, 'description')

      expect(title).toContain('Mile Ferenc')
      expect(description).toBeTruthy()
      await expect(page.locator('html')).toHaveAttribute('lang', lang)
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', url)
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
      expect(await meta(page, 'og:title')).toBe(title)
      expect(await meta(page, 'og:description')).toBe(description)
      expect(await meta(page, 'og:url')).toBe(url)
      expect(await meta(page, 'og:type')).toBe(type)
      const image = `${SITE}/og-mile-ferenc${lang === 'en' ? '-en' : ''}.png`
      expect(await meta(page, 'og:image')).toBe(image)
      expect(await meta(page, 'twitter:image')).toBe(image)
      expect(await meta(page, 'og:image:alt')).toContain('Mile Ferenc')
      expect(await page.locator('meta[name="robots"]').getAttribute('content')).not.toContain('noindex')

      const nodes = await graph(page)
      expect(nodes.map(node => node['@type'])).toEqual(schema)
      expect(nodes.find(node => node['@type'] === 'Person')).toMatchObject({
        '@id': PERSON,
        'name': 'Mile Ferenc',
        'alternateName': 'Ferenc Mile',
        'sameAs': expect.arrayContaining([
          'https://www.linkedin.com/in/ferenc-mile-65038446/',
          'https://github.com/fecz0',
        ]),
      })
    })
  }

  test('contains the home page and profile text without JavaScript', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1, name: 'Mile Ferenc' })).toBeVisible()
    await expect(page.getByText('Technológiai vezetőként rendszereket, termékeket és csapatokat építek.')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Megérteni' })).toBeVisible()
    expect((await graph(page)).find(node => node['@type'] === 'Person')).toMatchObject({
      jobTitle: 'Head of Development',
      knowsAbout: expect.arrayContaining(['Technológia', 'Engineering leadership']),
    })

    await page.goto('/rolam/')
    await expect(page.getByRole('heading', { name: 'Szoftverfejlesztőként kezdtem' })).toBeVisible()
    await expect(page.getByText('Head of Development')).toBeVisible()
  })

  test('connects the profile and the analysis to the same person', async ({ page }) => {
    await page.goto('/rolam/')
    expect((await graph(page)).find(node => node['@type'] === 'ProfilePage')?.mainEntity).toEqual({ '@id': PERSON })

    await page.goto('/problemak/haziorvosi-recept-1/')
    expect((await graph(page)).find(node => node['@type'] === 'Article')).toMatchObject({
      author: { '@id': PERSON },
      datePublished: '2025-02-03',
      dateModified: '2026-11-26',
      headline: await page.getByRole('heading', { level: 1 }).innerText(),
    })
  })

  test('pairs the Hungarian and English profiles', async ({ page }) => {
    for (const path of ['/rolam/', '/en/']) {
      await page.goto(path)
      await expect(page.locator('link[hreflang="hu"][rel="alternate"]')).toHaveAttribute('href', `${SITE}/rolam/`)
      await expect(page.locator('link[hreflang="en"][rel="alternate"]')).toHaveAttribute('href', `${SITE}/en/`)
    }

    // The English page doesn't state the current role, so its data doesn't either
    expect((await graph(page)).find(node => node['@type'] === 'Person')).not.toHaveProperty('jobTitle')
    await expect(page.getByText('I am Ferenc Mile, a technology leader')).toBeVisible()

    for (const path of ['/', '/szemleletem/', '/problemak/haziorvosi-recept-1/']) {
      await page.goto(path)
      await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0)
    }
  })

  test('serves 1200×630 sharing images and every icon of the manifest', async ({ request }) => {
    for (const file of ['/og-mile-ferenc.png', '/og-mile-ferenc-en.png']) {
      const png = await (await request.get(file)).body()
      // Width and height sit in the PNG header
      expect([png.readUInt32BE(16), png.readUInt32BE(20)], file).toEqual([1200, 630])
    }

    const manifest = await (await request.get('/site.webmanifest')).json()
    for (const { src, sizes } of manifest.icons) {
      const png = await (await request.get(src)).body()
      expect(`${png.readUInt32BE(16)}x${png.readUInt32BE(20)}`, src).toBe(sizes)
    }
  })

  test('gives every page its own title and description', async ({ page }) => {
    const titles = new Set<string>()
    const descriptions = new Set<string>()
    for (const { path } of pages) {
      await page.goto(path)
      titles.add(await page.title())
      descriptions.add((await meta(page, 'description'))!)
    }

    expect(titles.size).toBe(pages.length)
    expect(descriptions.size).toBe(pages.length)
  })

  test('has no broken internal links, anchors or assets', async ({ page, request }) => {
    const targets = new Map<string, string>()
    const anchors: { from: string, path: string, id: string }[] = []

    for (const { path } of pages) {
      await page.goto(path)
      const references = await page.evaluate(() =>
        [...document.querySelectorAll('a[href], link[href]:not([rel="canonical"]), script[src], img[src], meta[property="og:image"]')]
          .map(element => element.getAttribute('href') ?? element.getAttribute('src') ?? element.getAttribute('content')!),
      )
      for (const reference of references) {
        const url = new URL(reference.replace(SITE, ''), new URL(path, page.url()))
        if (url.origin !== new URL(page.url()).origin) continue
        targets.set(url.pathname, path)
        if (url.hash) anchors.push({ from: path, path: url.pathname, id: decodeURIComponent(url.hash.slice(1)) })
      }
    }

    for (const [target, from] of targets) {
      expect((await request.get(target)).status(), `${target} linked from ${from}`).toBe(200)
    }
    for (const { from, path, id } of anchors) {
      await page.goto(path)
      await expect(page.locator(`[id="${id}"]`), `${path}#${id} linked from ${from}`).toHaveCount(1)
    }
  })

  test('lists every page in the sitemap', async ({ request }) => {
    const sitemap = await (await request.get('/sitemap.xml')).text()

    for (const { path } of pages) expect(sitemap).toContain(`<loc>${SITE}${path}</loc>`)
  })

  test('explains a missing page and links back home', async ({ page }) => {
    const response = await page.goto('/non-existent-page-12345/')

    expect(response?.status()).toBe(404)
    await expect(page.getByRole('heading', { level: 1, name: '404' })).toBeVisible()
    await expect(page.getByText('A keresett oldal nem található')).toBeVisible()
    expect(await meta(page, 'robots')).toContain('noindex')

    await page.getByRole('link', { name: 'Vissza a főoldalra' }).click()
    await expect(page).toHaveURL('/')
  })
})
