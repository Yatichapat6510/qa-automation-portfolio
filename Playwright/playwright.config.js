// @ts-check
import { defineConfig, devices } from '@playwright/test';

const SAUCE_DEMO_BASE_URL = 'https://www.saucedemo.com/';

/** @see https://playwright.dev/docs/test-configuration */
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.[jt]s',
  // Practice files are intentionally unregistered learning examples. Several are
  // selector notes rather than executable Playwright tests.
  testIgnore: ['practice/**'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: SAUCE_DEMO_BASE_URL,
    // Headless is the default for the CLI and VS Code Test Explorer. Playwright's
    // --headed flag still overrides this value, and --ui still opens UI mode.
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    {
      name: 'demo-e2e-chromium',
      testMatch: [
        'interaction-workflows/**/*.spec.js',
        'e2e/E2E api-integration.spec.js',
        'e2e/E2E api-reqres.spec.js',
        'e2e/E2E form-validation.spec.js',
        'e2e/E2E Mini-Project 1.spec.js',
        'e2e/E2E Shopping.spec.js',
      ],
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    {
      name: 'sauce-demo-chromium',
      testMatch: 'e2e/sauce-demo/tests/**/*.spec.js',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        baseURL: SAUCE_DEMO_BASE_URL,
      },
    },
  ],
});
