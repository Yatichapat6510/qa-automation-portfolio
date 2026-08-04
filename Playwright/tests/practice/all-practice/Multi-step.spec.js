// ตรวจทุก checkpoint ใน checkout flow

import { test, expect } from "@playwright/test";

test('checkout assertions ทุก step', async ({ page }) => {
  // Step 1: Cart page
  await expect(page).toHaveURL(/cart/);
  await expect(page.locator('.cart-item')).toHaveCount(2);
  const total = await page.locator('.cart-total').textContent();

  // Step 2: Checkout info
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page).toHaveURL(/checkout\/info/);
  await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();

  // Step 3: Summary — ตรวจ total ตรงกัน
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('.summary-total')).toHaveText(total);

  // Step 4: Confirm
  await page.getByRole('button', { name: 'Finish' }).click();
  await expect(page.getByRole('heading', { name: 'Thank you' })).toBeVisible();
  await expect(page.locator('.order-number')).toBeVisible();
  
});