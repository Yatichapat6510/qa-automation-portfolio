// ======================================
// Set 3: Assertions
// ======================================

import { test, expect } from '@playwright/test';


//3.1 From Validation (Soft Assertion)
//=====================================

test('assertions - form validation soft assertions', async ({ page }) => {
  await page.getByRole('button', { name: 'Submit' }).click();
  expect.soft(page.getByText('Email is required')).toBeVisible();
  expect.soft(page).not.toHaveURL(/success/);
  expect.soft(page.getByRole('button', { name: 'Submit' })).toBeEnabled();
});


//3.2 Count, State, URL, Sorted List
//===================================

// 3.2 Count
test('assertions - list item count', async ({ page }) => {
  await expect(page.getByRole('listitem')).toHaveCount(3);
});

// 3.3 Button state
test('assertions - button disabled until card number filled', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Pay' })).toBeDisabled();
  await page.getByLabel('Card number').fill('4111111111111111');
  await expect(page.getByRole('button', { name: 'Pay' })).toBeEnabled();
});

// 3.4 URL after logout
test('assertions - URL after logout', async ({ page }) => {
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page).toHaveURL(/login/);
});

// 3.5 Sorted A-Z
test('assertions - list sorted alphabetically', async ({ page }) => {
  const names = await page.locator('.user-name').allTextContents();
  expect(names).toEqual([...names].sort());
});
