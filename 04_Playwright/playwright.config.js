// @ts-check
import { defineConfig, devices } from '@playwright/test';

/** @see https://playwright.dev/docs/test-configuration */
export default defineConfig({
  testDir: './tests',
  // The runnable suite is explicitly isolated from the non-runnable practice library.
  testMatch: 'e2e/**/*.spec.js',
  testIgnore: ['practice/**'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    // Change this to the real application URL when these tests are used
    // against a deployed application. The demo suite intercepts this host.
    baseURL: process.env.BASE_URL ?? 'http://demo.local',
    trace: 'on-first-retry',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'demo-e2e-chromium',
      // Uses installed Google Chrome without a machine-specific executable path.
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
});
