import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 30000,
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:4173',
    trace: 'on-first-retry',
  },
  // Tests run against the generated static site, which is what gets deployed.
  // Set BASE_URL to test an already running site instead.
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'pnpm run generate && node scripts/serve-static.mjs',
        url: 'http://localhost:4173',
        reuseExistingServer: false,
        timeout: 180000,
      },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
