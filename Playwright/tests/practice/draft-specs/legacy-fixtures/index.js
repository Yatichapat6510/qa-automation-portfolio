// POM + Fixtures : Refactor Login Test
// inject page odjects อัตโนมัติทุก test case โดยไม่ต้องสร้างซ้ำ



// fixtures/index.js
import { test as base, expect } from '@playwright/test';
import { LoginPage }     from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  // loggedIn — login ให้ก่อนเสมอ
  inventoryPage: async ({ page }, use) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.loginAsStandardUser();
    await use(new InventoryPage(page));
  }
});

export { expect };

// tests/inventory.spec.js — สะอาด ไม่มี setup ซ้ำ
import { test, expect } from '../fixtures';

test('inventory shows 6 products', async ({ inventoryPage }) => {
  await expect(inventoryPage.productItems).toHaveCount(6);
});

test('add backpack to cart', async ({ inventoryPage }) => {
  await inventoryPage.addToCartByName('Sauce Labs Backpack');
  await inventoryPage.expectCartCount(1);
});