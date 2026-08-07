import { test as base, expect } from '@playwright/test';
import { sauceDemoPage } from '../app-content/sauce-demo.pages.js';
import { validCredentials } from '../data/credentials.data.js';
import { CartPage } from '../pages/cart.page.js';
import { CheckoutPage } from '../pages/checkout.page.js';
import { InventoryPage } from '../pages/inventory.page.js';
import { LoginPage } from '../pages/login.page.js';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route('https://www.saucedemo.com/**', async route => {
      const body = sauceDemoPage(new URL(route.request().url()).pathname);

      await route.fulfill({
        status: body ? 200 : 404,
        contentType: 'text/html',
        body: body ?? '<h1>Not found</h1>',
      });
    });

    await use(page);
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  authenticatedApp: async ({ loginPage, inventoryPage, cartPage, checkoutPage }, use) => {
    await loginPage.open();
    await loginPage.login(validCredentials.username, validCredentials.password);
    await inventoryPage.inventoryList.waitFor();
    await use({ inventoryPage, cartPage, checkoutPage });
  },
});

export { expect };
