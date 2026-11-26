import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('loads and displays main content', async ({ page }) => {
    await page.goto('/')

    // Check page title
    await expect(page).toHaveTitle(/Mile Ferenc/)

    // Check hero section
    await expect(page.getByRole('heading', { name: 'A problémák érdekelnek. Főleg azok, amiket már mindenki megszokott.' })).toBeVisible()

    // Check navigation exists (use header navigation to avoid duplicates)
    const header = page.locator('header')
    await expect(header.getByRole('link', { name: 'Gondolatok' })).toBeVisible()
    await expect(header.getByRole('link', { name: 'Kapcsolat' })).toBeVisible()
    await expect(header.getByRole('link', { name: 'Rólam' })).toBeVisible()
  })

  test('lists five Substack articles below the existing analysis', async ({ page }) => {
    await page.goto('/')

    const thoughts = page.getByRole('region', { name: 'Gondolatok' })
    await expect(thoughts.getByRole('link').first()).toHaveAttribute('href', /\/problemak\/haziorvosi-recept-1\/?$/)
    const publications = thoughts.locator('li').filter({ has: page.locator('a[href^="https://fecz0.substack.com/p/"]') })
    await expect(publications).toHaveCount(5)
    for (const publication of await publications.all()) {
      await expect(publication.getByRole('link')).toBeVisible()
      await expect(publication.locator('p')).not.toBeEmpty()
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
    await expect(page.getByRole('heading', { name: 'A problémák érdekelnek. Főleg azok, amiket már mindenki megszokott.' })).toBeVisible()
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
    await page.getByRole('link', { name: 'Szemléletem' }).first().click()

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

  test('displays TL;DR section', async ({ page }) => {
    await page.goto('/problemak/haziorvosi-recept-1')

    // Check TL;DR block exists
    await expect(page.getByText('TL;DR')).toBeVisible()
  })

  test('displays discussion links', async ({ page }) => {
    await page.goto('/problemak/haziorvosi-recept-1')

    // Check discussion section
    await expect(page.getByText('Vitassuk meg')).toBeVisible()
    await expect(page.getByRole('link', { name: 'LinkedIn' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Bluesky' })).toBeVisible()
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

    const source = page.getByRole('main').locator('a[href^="https://www.nhsbsa.nhs.uk/"]')
    await expect(source).toHaveCSS('text-decoration-line', 'underline')
    await expect(source).toHaveAttribute('target', '_blank')
    await expect(source).toHaveAttribute('rel', 'noopener noreferrer')
  })
})

test.describe('Site Details', () => {
  test('lists every public profile under contact', async ({ page }) => {
    await page.goto('/')

    const contact = page.getByRole('region', { name: 'Kapcsolat' })
    for (const name of ['Substack', 'Bluesky', 'GitHub']) {
      await expect(contact.getByRole('link', { name })).toBeVisible()
    }
  })

  test('shows when an analysis was written', async ({ page }) => {
    await page.goto('/problemak/haziorvosi-recept-1')

    await expect(page.getByRole('main').locator('time')).toHaveText('2025. február 3.')
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

test.describe('Error Handling', () => {
  test('shows 404 for non-existent page', async ({ page }) => {
    await page.goto('/non-existent-page-12345')

    // Check error page displays
    await expect(page.getByText('404')).toBeVisible()
  })
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

    await page.getByRole('link', { name: 'Amivel foglalkozom' }).click()
    await expect(page).toHaveURL(/#amivel-foglalkozom$/)
  })
})
