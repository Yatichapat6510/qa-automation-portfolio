// @ts-check
import { defineConfig } from '@playwright/test';
import { activeEnvironment } from './configs/environment.js';
import { executableProjects } from './configs/projects.js';

/** @see https://playwright.dev/docs/test-configuration */
export default defineConfig({
  // Only production-grade, executable tests are discovered by the default suite.
  // `tests/practice/**` is deliberately outside this directory and therefore
  // cannot run from the CLI or VS Code Testing Explorer by accident.
  testDir: './tests/e2e',
  testMatch: '**/specs/**/*.spec.[jt]s',
  testIgnore: ['**/practice/**'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: activeEnvironment.baseURL,
    // Headless is the default for the CLI and VS Code Test Explorer. Playwright's
    // --headed flag still overrides this value, and --ui still opens UI mode.
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: executableProjects,
});
