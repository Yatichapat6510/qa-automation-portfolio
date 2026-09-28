// ======================================
// Set 6: E2E Complete
// ======================================

import { test, expect } from '@playwright/test';


//6.1 Complete E2E: SauceDemo Checkout
//=====================================

test('ซื้อสินค้าครบ flow', async ({ page }) => {
  // 1. Login
  await page.goto('https://www.saucedemo.com');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/inventory/);

  // 2. Add product
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // 3. Cart
  await page.locator('.shopping_cart_link').click();
  await expect(page.locator('.cart_item')).toHaveCount(1);

  // 4. Checkout info
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('John');
  await page.locator('[data-test="lastName"]').fill('Doe');
  await page.locator('[data-test="postalCode"]').fill('10000');
  await page.locator('[data-test="continue"]').click();

  // 5. Confirm & Finish
  await expect(page.locator('.summary_info')).toBeVisible();
  await page.locator('[data-test="finish"]').click();

  // 6. Assert success
  await expect(page.locator('.complete-header'))
    .toHaveText('Thank you for your order!');
});
