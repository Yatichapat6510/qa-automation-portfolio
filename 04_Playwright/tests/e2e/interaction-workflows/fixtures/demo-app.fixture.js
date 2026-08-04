import { test as base, expect } from '@playwright/test';
import { demoPages } from '../app-content/demo-pages.js';

// A deterministic local demo app for learning interaction tests. Replace this
// fixture with calls to the real application when its URL and UI are available.
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route('http://demo.local/**', async (route) => {
      const path = new URL(route.request().url()).pathname;
      const body = demoPages[path];

      await route.fulfill({
        status: body ? 200 : 404,
        contentType: 'text/html',
        body: body ?? '<h1>Not found</h1>',
      });
    });

    await use(page);
  },
});

export { expect };
