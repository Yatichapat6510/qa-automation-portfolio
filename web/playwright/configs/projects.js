import { devices } from '@playwright/test';

export const executableProjects = [
  {
    name: 'demo-e2e-chromium',
    testMatch: 'demo-app/specs/**/*.spec.[jt]s',
    use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  },
  {
    name: 'sauce-demo-chromium',
    testMatch: 'sauce-demo/specs/**/*.spec.[jt]s',
    use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  },
];
