// ======================================
// Set 1: Locators
// ======================================

import { test, expect } from '@playwright/test';


//1.1 Login From Locators
//=======================

test('locators - login form fields', async ({ page }) => {
  //Email field
  page.getByLabel('Email');    //✅ Best
  page.locator('#email');      // OK

  //Sign In button
  page.getByRole('button', { name: 'Sign In '})   // ✅ Best
  page.getByTestId('login-btn')   // ✅ Best
});


//1.2 Product Card
//=================

test('locators - product card elements', async ({ page }) => {
  page.getByAltText('Samsung S25 Ultra')
  page.getByRole('heading', { name: 'Samsung S25 Ultra' })
  page.locator('.price')
  page.getByRole('button', { name: 'Add to Card'})
});


//1.3 Table Row Edit Button
//Task: หา row ที่มีชื่อ "Alice" แล้วคลิกปุ่ม "Edit" ใน row นั้น
//=========================

test('locators - table row edit button', async ({ page }) => {
  await page.getByRole('row')
      .filter({ hasText: 'Newyear' })
      .getByRole('button', { name: 'Edit' })
      .click();
});


//1.4 Scoped Section
//Task: มี 2 sections มีปุ่ม "Add" แต่ต้องการเฉพาะใน "Featured Products"
//=========================

test('locators - scoped section button', async ({ page }) => {
  const section = page.getByRole('region', { name: 'Featured Products' });
  await section.getByRole('button', { name: 'Add' }).click();
});


//1.5 Remove & Verify List
//=========================

test('locators - remove and verify list', async ({ page }) => {
  const first = page.getByRole('listitem').first();
  const name = await first.getByRole('heading').textContent();
  await first.getByRole('button', { name: 'Remove' }).click();
  await expect(page.getByRole('listitem')).toHaveCount(5);
  await expect(page.getByText(name)).not.toBeVisible();
});

