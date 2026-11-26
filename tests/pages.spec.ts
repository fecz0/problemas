import { test, expect } from '@playwright/test'

const claim = 'A problémák érdekelnek. Főleg azok, amiket már mindenki megszokott.'

test.describe('Layout', () => {
  for (const width of [375, 390, 768, 1024, 1440, 1920]) {
    test(`never scrolls sideways at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      for (const path of ['/', '/rolam/', '/szemleletem/', '/problemak/haziorvosi-recept-1/']) {
        await page.goto(path)
        expect(await page.evaluate(() => document.documentElement.scrollWidth), path).toBeLessThanOrEqual(width)
      }
    })
  }
})

test.describe('Home Page', () => {
  test('loads and displays main content', async ({ page }) => {
    await page.goto('/')

    // Check page title
    await expect(page).toHaveTitle(/Mile Ferenc/)

    // The name leads, the claim follows
    await expect(page.getByRole('heading', { level: 1, name: 'Mile Ferenc' })).toBeVisible()
    await expect(page.getByRole('heading', { level: 2, name: claim })).toBeVisible()

    // Check navigation exists (use header navigation to avoid duplicates)
    const header = page.locator('header')
    for (const name of ['Rólam', 'Szemléletem', 'Írások', 'Kapcsolat']) {
      await expect(header.getByRole('link', { name })).toBeVisible()
    }
  })

  for (const [width, height] of [[375, 812], [390, 844], [1440, 900]] as const) {
    test(`shows who, what and where next on the first ${width}px screen`, async ({ page }) => {
      await page.setViewportSize({ width, height })
      await page.goto('/')

      for (const element of [
        page.getByRole('heading', { level: 1 }),
        page.getByRole('heading', { name: claim }),
        page.getByRole('link', { name: 'Ismerj meg' }),
      ]) {
        await expect(element).toBeInViewport({ ratio: 1 })
      }
    })
  }

  test('lists five Substack articles and the analysis, newest first', async ({ page }) => {
    await page.goto('/')

    const writings = page.getByRole('region', { name: 'Írások' })
    await expect(writings.getByRole('link').first()).toHaveAttribute('href', /a-visszafordithatatlan-dontesek-csapdaja$/)
    await expect(writings.getByRole('link').last()).toHaveAttribute('href', /\/problemak\/haziorvosi-recept-1\/?$/)
    const dates = await writings.locator('time').evaluateAll(times => times.map(time => time.getAttribute('datetime')!))
    expect(dates).toEqual([...dates].sort().reverse())
    const publications = writings.locator('li').filter({ has: page.locator('a[href^="https://fecz0.substack.com/p/"]') })
    await expect(publications).toHaveCount(5)
    for (const publication of await publications.all()) {
      await expect(publication.getByRole('link')).toHaveAccessibleName(/külső oldal/)
      await expect(publication).toContainText('Substack')
    }
  })

  test('explains the problem-solving cycle as an ordered list', async ({ page }) => {
    for (const path of ['/', '/szemleletem/']) {
      await page.goto(path)

      const steps = page.getByRole('list', { name: 'Problémamegoldási ciklus' }).getByRole('heading')
      await expect(steps).toHaveText(['Megérteni', 'Egyszerűsíteni', 'Kipróbálni', 'Mérni', 'Javítani'])
      await expect(page.getByText('Az ötödik lépés után újra az első következik.')).toBeAttached()
    }
  })

  test('states the experience without naming employers on both pages', async ({ page }) => {
    for (const path of ['/', '/rolam/']) {
      await page.goto(path)

      await expect(page.getByRole('main').getByRole('definition')).toHaveCount(3)
      await expect(page.getByRole('main').getByRole('definition').first()).toContainText('Head of Development')
    }
  })
})

test.describe('Rólam (About) Page', () => {
  test('loads and displays content', async ({ page }) => {
    await page.goto('/rolam')

    // Check page loads with content
    await expect(page).toHaveTitle(/Mile Ferenc/)

    // Check main content area exists
    const mainContent = page.locator('main')
    await expect(mainContent).toBeVisible()
  })

  test('has working navigation back to home', async ({ page }) => {
    await page.goto('/rolam')

    // Click on logo/home link to go back
    await page.getByRole('link', { name: /problemas\.hu/i }).first().click()

    // Should be on home page
    await expect(page).toHaveURL('/')
    await expect(page.getByRole('heading', { name: claim })).toBeVisible()
  })
})

test.describe('Szemléletem (Philosophy) Page', () => {
  test('loads and displays content', async ({ page }) => {
    await page.goto('/szemleletem')

    // Check page loads
    await expect(page).toHaveTitle(/problemas\.hu/)

    // Check the page has content
    const mainContent = page.locator('main')
    await expect(mainContent).toBeVisible()
  })

  test('navigation from home works', async ({ page }) => {
    await page.goto('/')

    // Click on Szemléletem link
    await page.getByRole('main').getByRole('link', { name: 'Szemléletem' }).click()

    // Should navigate to the page
    await expect(page).toHaveURL(/szemleletem/)
  })
})

test.describe('Problem Article Page', () => {
  test('loads haziorvosi-recept article', async ({ page }) => {
    await page.goto('/problemak/haziorvosi-recept-1')

    // Check page title includes the article info
    await expect(page).toHaveTitle(/problemas\.hu/)

    // Check article content loads (use heading for specificity)
    await expect(page.getByRole('heading', { name: /Ismétlődő eRecept/ }).first()).toBeVisible()

    // Check status badge is displayed
    await expect(page.getByText('Kutatás')).toBeVisible()
  })

  test('keeps a sentence about 2027 as prose', async ({ page }) => {
    await page.goto('/problemak/haziorvosi-recept-1')

    // A year at the start of a line would turn into a numbered list
    await expect(page.getByRole('main').getByRole('paragraph').filter({ hasText: '2027. január 1-jétől' })).toBeVisible()
  })

  test('displays TL;DR section', async ({ page }) => {
    await page.goto('/problemak/haziorvosi-recept-1')

    // Check TL;DR block exists
    await expect(page.getByText('TL;DR')).toBeVisible()
  })

  test('displays discussion links', async ({ page }) => {
    await page.goto('/problemak/haziorvosi-recept-1')

    // Check discussion section
    await expect(page.getByText('Vitassuk meg')).toBeVisible()
    await expect(page.getByRole('main').getByRole('link', { name: 'LinkedIn' })).toBeVisible()
    await expect(page.getByRole('main').getByRole('link', { name: 'Bluesky' })).toBeVisible()
  })

  test('displays incremental steps', async ({ page }) => {
    await page.goto('/problemak/haziorvosi-recept-1')

    // Check steps are rendered
    await expect(page.getByText('Jelenlegi állapot')).toBeVisible()
    await expect(page.getByText('Ismétlődő eRecept keretrendszer')).toBeVisible()
  })
})

test.describe('Content Links', () => {
  test('are underlined so they stand out from body text', async ({ page }) => {
    await page.goto('/rolam')

    const link = page.getByRole('main').getByRole('link', { name: 'Szemléletem' })
    await expect(link).toHaveCSS('text-decoration-line', 'underline')
    await expect(link).toHaveAttribute('href', '/szemleletem/')
    await expect(link).not.toHaveAttribute('target', '_blank')
  })

  test('open external sources safely in a new tab', async ({ page }) => {
    await page.goto('/problemak/haziorvosi-recept-1')

    const source = page.getByRole('main').locator('a[href$="electronic-repeat-dispensing-erd"]')
    await expect(source).toHaveCSS('text-decoration-line', 'underline')
    await expect(source).toHaveAttribute('target', '_blank')
    await expect(source).toHaveAttribute('rel', 'noopener noreferrer')
  })
})

test.describe('Site Details', () => {
  test('lists every public profile under contact', async ({ page }) => {
    await page.goto('/')

    const contact = page.getByRole('region', { name: 'Kapcsolat' })
    for (const name of ['LinkedIn', 'Substack', 'Bluesky', 'GitHub']) {
      await expect(contact.getByRole('link', { name })).toBeVisible()
    }
  })

  test('shows who wrote an analysis, when, and when it was updated', async ({ page }) => {
    await page.goto('/problemak/haziorvosi-recept-1')

    const main = page.getByRole('main')
    await expect(main.getByRole('link', { name: 'Mile Ferenc' })).toHaveAttribute('href', '/rolam/')
    await expect(main.locator('time')).toHaveText(['2025. február 3.', '2026. november 26.'])
  })

  test('says whose opinions these are in the footer', async ({ page }) => {
    await page.goto('/rolam')

    await expect(page.getByRole('contentinfo')).toContainText('saját szakmai véleményemet')
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'LinkedIn' })).toBeVisible()
  })

  test('requests nothing from third parties', async ({ page, baseURL }) => {
    const external: string[] = []
    page.on('request', (request) => {
      const url = new URL(request.url())
      if (url.protocol.startsWith('http') && url.origin !== new URL(baseURL!).origin) external.push(url.href)
    })

    await page.goto('/')
    await page.getByRole('link', { name: /Ismétlődő eRecept/ }).click()
    await expect(page.getByText('Vitassuk meg')).toBeVisible()
    await page.waitForLoadState('networkidle')

    expect(external).toEqual([])
  })

  test('serves its own display font', async ({ page }) => {
    await page.goto('/')

    await expect.poll(() => page.evaluate(() => [...document.fonts].some(font =>
      font.family.replaceAll('"', '') === 'Space Grotesk' && font.status === 'loaded',
    ))).toBe(true)
  })
})

test.describe('Client-side Navigation', () => {
  test('keeps one canonical URL and one structured data block per page', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    for (const [name, path] of [['Ismerj meg', '/rolam/'], ['Szemléletem', '/szemleletem/']] as const) {
      await page.getByRole('main').getByRole('link', { name }).first().click()

      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://problemas.hu${path}`)
      const data = page.locator('script[type="application/ld+json"]')
      await expect(data).toHaveCount(1)
      // Text matchers ignore script contents, so read it directly
      await expect.poll(() => data.textContent()).toContain(`https://problemas.hu${path}#webpage`)
    }
  })
})

test.describe('Error Handling', () => {
  test('shows 404 for non-existent page', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto('/non-existent-page-12345')
    await page.waitForLoadState('networkidle')

    // Check error page displays and stays after the app has started
    await expect(page.getByText('404')).toBeVisible()
    await page.getByRole('link', { name: 'Vissza a főoldalra' }).click()
    await expect(page.getByRole('heading', { name: claim })).toBeVisible()
    expect(errors).toEqual([])
  })
})

test.describe('Keyboard', () => {
  for (const path of ['/', '/rolam/']) {
    test(`can skip straight to the content of ${path}`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      const skip = page.getByRole('link', { name: 'Ugrás a tartalomra' })

      await expect(skip).not.toBeInViewport()
      await page.keyboard.press('Tab')
      await expect(skip).toBeFocused()
      await expect(skip).toBeInViewport()
      await page.keyboard.press('Enter')
      await expect(page.getByRole('main')).toBeFocused()
    })
  }
})

test.describe('Dark Mode', () => {
  test('keeps the hero readable in both color modes on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto('/')

    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(242, 240, 233)')
    await expect(page.locator('header').getByRole('button', { name: /sötét módra|világos módra/ })).toBeVisible()
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.reload()
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(17, 20, 25)')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(await page.locator('body').evaluate(body => body.scrollWidth)).toBeLessThanOrEqual(375)

    await page.getByRole('link', { name: 'Ahogy gondolkodom' }).click()
    await expect(page).toHaveURL(/#szemlelet$/)
    await expect(page.getByRole('heading', { name: 'A rosszul működő rendszer nem természeti törvény.' })).toBeInViewport()
  })
})
