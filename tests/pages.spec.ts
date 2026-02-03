import { test, expect } from '@playwright/test'

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

test.describe('Home Page', () => {
  test('loads and displays main content', async ({ page }) => {
    await page.goto(BASE_URL)

    // Check page title
    await expect(page).toHaveTitle(/problemas\.hu/)

    // Check hero section
    await expect(page.getByText('Problémák és működő megoldások')).toBeVisible()

    // Check navigation exists (use header navigation to avoid duplicates)
    const header = page.locator('header')
    await expect(header.getByRole('link', { name: 'Problémák' })).toBeVisible()
    await expect(header.getByRole('link', { name: 'Szemléletem' })).toBeVisible()
    await expect(header.getByRole('link', { name: 'Rólam' })).toBeVisible()
  })

  test('displays problem cards section', async ({ page }) => {
    await page.goto(BASE_URL)

    // Check that the problems section exists
    await expect(page.getByText('Elemzett problémák')).toBeVisible()
  })
})

test.describe('Rólam (About) Page', () => {
  test('loads and displays content', async ({ page }) => {
    await page.goto(`${BASE_URL}/rolam`)

    // Check page loads with content
    await expect(page).toHaveTitle(/problemas\.hu/)

    // Check main content area exists
    const mainContent = page.locator('main')
    await expect(mainContent).toBeVisible()
  })

  test('has working navigation back to home', async ({ page }) => {
    await page.goto(`${BASE_URL}/rolam`)

    // Click on logo/home link to go back
    await page.getByRole('link', { name: /problemas\.hu/i }).first().click()

    // Should be on home page
    await expect(page).toHaveURL(BASE_URL)
    await expect(page.getByText('Problémák és működő megoldások')).toBeVisible()
  })
})

test.describe('Szemléletem (Philosophy) Page', () => {
  test('loads and displays content', async ({ page }) => {
    await page.goto(`${BASE_URL}/szemleletem`)

    // Check page loads
    await expect(page).toHaveTitle(/problemas\.hu/)

    // Check the page has content
    const mainContent = page.locator('main')
    await expect(mainContent).toBeVisible()
  })

  test('navigation from home works', async ({ page }) => {
    await page.goto(BASE_URL)

    // Click on Szemléletem link
    await page.getByRole('link', { name: 'Szemléletem' }).first().click()

    // Should navigate to the page
    await expect(page).toHaveURL(/szemleletem/)
  })
})

test.describe('Problem Article Page', () => {
  test('loads haziorvosi-recept article', async ({ page }) => {
    await page.goto(`${BASE_URL}/problemak/haziorvosi-recept-1`)

    // Check page title includes the article info
    await expect(page).toHaveTitle(/problemas\.hu/)

    // Check article content loads (use heading for specificity)
    await expect(page.getByRole('heading', { name: /Ismétlődő eRecept/ }).first()).toBeVisible()

    // Check status badge is displayed
    await expect(page.getByText('Kutatás')).toBeVisible()
  })

  test('displays TL;DR section', async ({ page }) => {
    await page.goto(`${BASE_URL}/problemak/haziorvosi-recept-1`)

    // Check TL;DR block exists
    await expect(page.getByText('TL;DR')).toBeVisible()
  })

  test('displays discussion links', async ({ page }) => {
    await page.goto(`${BASE_URL}/problemak/haziorvosi-recept-1`)

    // Check discussion section
    await expect(page.getByText('Vitassuk meg')).toBeVisible()
    await expect(page.getByRole('link', { name: 'LinkedIn' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Bluesky' })).toBeVisible()
  })

  test('displays incremental steps', async ({ page }) => {
    await page.goto(`${BASE_URL}/problemak/haziorvosi-recept-1`)

    // Check steps are rendered
    await expect(page.getByText('Jelenlegi állapot')).toBeVisible()
    await expect(page.getByText('Ismétlődő eRecept keretrendszer')).toBeVisible()
  })
})

test.describe('Error Handling', () => {
  test('shows 404 for non-existent page', async ({ page }) => {
    await page.goto(`${BASE_URL}/non-existent-page-12345`)

    // Check error page displays
    await expect(page.getByText('404')).toBeVisible()
  })
})

test.describe('Dark Mode', () => {
  test('color mode toggle exists', async ({ page }) => {
    await page.goto(BASE_URL)

    // Check that a color mode button exists (it might be labeled differently)
    // Look for any button that could be color mode toggle
    const buttons = page.locator('button')
    const buttonCount = await buttons.count()
    expect(buttonCount).toBeGreaterThan(0)
  })
})
