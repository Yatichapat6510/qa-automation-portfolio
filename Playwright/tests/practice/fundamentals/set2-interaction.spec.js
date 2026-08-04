// ======================================
// Set 2: Interaction
// ======================================

import { test, expect } from '@playwright/test';


//2.1 From Fill & Submit
//=======================

test('interaction - form fill and submit', async ({ page }) => {
  await page.getByLabel('Full Name').fill('John Doe');
  await page.getByRole('Email').fill('john@test.com');
  await page.getByLabel('I agree to terms').check();
  await page.getByRole('button', { name: 'Register' }).check();
  await expect(page).toHaveURL(/success/);
});


//2.2 Dropdown. Hover, Upload, Drag, Keyboard, Focus
//===================================================

// 2.2 Dropdown
test('interaction - dropdown single and multi select', async ({ page }) => {
  await page.getByLabel('Country').selectOption('Thailand');
  await page.getByLabel('Skills').selectOption(['JS', 'Python']);
});

// 2.3 Hover + Tooltip
test('interaction - hover shows tooltip', async ({ page }) => {
  await page.getByRole('button', { name: 'More info' }).hover();
  await expect(page.getByRole('tooltip')).toBeVisible();
});

// 2.4 Keyboard Tab
test('interaction - keyboard tab navigation', async ({ page }) => {
  await page.getByLabel('First Name').focus();
  await page.keyboard.press('Tab');
  await expect(page.getByLabel('Last Name')).toBeFocused();
});

// 2.5 File upload
test('interaction - file upload', async ({ page }) => {
  await page.getByLabel('Upload Resume').setInputFiles('./resume.pdf');
});

// 2.6 Drag and drop
test('interaction - drag and drop task card', async ({ page }) => {
  await page.locator('.task-card').filter({ hasText: 'Fix bug' })
    .dragTo(page.locator('.column-done'));
});

// 2.7 Keyboard shortcut
test('interaction - keyboard shortcut opens dialog', async ({ page }) => {
  await page.locator('body').press('Control+K');
  await expect(page.getByRole('dialog')).toBeVisible();
});
