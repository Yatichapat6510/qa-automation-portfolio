// ======================================
// Exercise Sets — 25+ โจทย์พร้อม Solutions (ฝึกเขียนให้เข้าใจ)
// ======================================


//=======================
//Set 1: Locators
//=======================

//1.1 Login From Locators
//=======================

import { test, expect } from '@playwright/test';

test('locators - email field examples', async ({ page }) => {
	//Email field
	page.getByLabel('Email');    //✅ Best
	page.locator('#email');      // OK
});

//Sign In button
page.getByRole('button', { name: 'Sign In '})   // ✅ Best
page.getByTestId('login-btn')   // ✅ Best


//1.2 Product Card
//=================

page.getByAltText('Samsung S25 Ultra')
page.getByRole('heading', { name: 'Samsung S25 Ultra' })
page.locator('.price')
page.getByRole('button', { name: 'Add to Card'})


//1.3 Table Row Edit Button
//Task: หา row ที่มีชื่อ "Alice" แล้วคลิกปุ่ม "Edit" ใน row นั้น
//=========================

await page.getByRole('row')
    .filter({ hasText: 'Newyear' })
    .getByRole('button', { name: 'Edit' })
    .click();


//1.4 Scoped Section
//Task: มี 2 sections มีปุ่ม "Add" แต่ต้องการเฉพาะใน "Featured Products"
//=========================

const section = page.getByRole('region', { name: 'Featured Products' });
await section.getByRole('button', { name: 'Add' }).click();


//1.5 Remove & Verify List
//=========================

const first = page.getByRole('listitem').first();
const name = await first.getByRole('heading').textContent();
await first.getByRole('button', { name: 'Remove' }).click();
await expect(page.getByRole('listitem')).toHaveCount(5);
await expect(page.getByText(name)).not.toBeVisible();




//=======================
//Set 2: Interaction
//=======================


//2.1 From Fill & Submit
//=======================

await page.getByLabel('Full Name').fill('John Doe');
await page.getByRole('Email').fill('john@test.com');
await page.getByLabel('I agree to terms').check();
await page.getByRole('button', { name: 'Register' }).check();
await expect(page).toHaveURL(/success/);


//2.2 Dropdown. Hover, Upload, Drag, Keyboard, Focus
//===================================================

// 2.2 Dropdown
await page.getByLabel('Country').selectOption('Thailand');
await page.getByLabel('Skills').selectOption(['JS', 'Python']);

// 2.3 Hover + Tooltip
await page.getByRole('button', { name: 'More info' }).hover();
await expect(page.getByRole('tooltip')).toBeVisible();

// 2.4 Keyboard Tab
await page.getByLabel('First Name').focus();
await page.keyboard.press('Tab');
await expect(page.getByLabel('Last Name')).toBeFocused();

// 2.5 File upload
await page.getByLabel('Upload Resume').setInputFiles('./resume.pdf');

// 2.6 Drag and drop
await page.locator('.task-card').filter({ hasText: 'Fix bug' })
  .dragTo(page.locator('.column-done'));

// 2.7 Keyboard shortcut
await page.locator('body').press('Control+K');
await expect(page.getByRole('dialog')).toBeVisible();




//===================
//Set 3: Assertions
//===================

//3.1 From Validation (Soft Assertion)
//=====================================

await page.getByRole('button', { name: 'Submit' }).click();
expect.soft(page.getByText('Email is required')).toBeVisible();
expect.soft(page).not.toHaveURL(/success/);
expect.soft(page.getByRole('button', { name: 'Submit' })).toBeEnabled();


//3.2 Count, State, URL, Sorted List
//===================================

// 3.2 Count
await expect(page.getByRole('listitem')).toHaveCount(3);

// 3.3 Button state
await expect(page.getByRole('button', { name: 'Pay' })).toBeDisabled();
await page.getByLabel('Card number').fill('4111111111111111');
await expect(page.getByRole('button', { name: 'Pay' })).toBeEnabled();

// 3.4 URL after logout
await page.getByRole('button', { name: 'Logout' }).click();
await expect(page).toHaveURL(/login/);

// 3.5 Sorted A-Z
const names = await page.locator('.user-name').allTextContents();
expect(names).toEqual([...names].sort());




//===========
//Set 4: POM
//===========

//4.1 Refactor to POM
//====================

export class CheckoutPage{
    constructor(page) {
        this.page = page;
        this.firstnameField = page.getByLabel('First Name');
        this.lastNameField  = page.getByLabel('Last Name');
        this.continueBtn    = page.getByRole('button', { name: 'Continue' });
    }
async fillShipping(first, Last) {
    await this.firstnameField.fill(first);
    await this.lastNameField.fill(Last);
    await this.continueBtn.click();
    }
}

//test

test('checkout', async({page}) => {
  const checkout = new CheckoutPage(page);
  await checkout.page.goto('/checkout');
  await checkout.fillShipping('John', 'Doe');
  await expect(page).toHaveURL(/payment/);
});




//===================
//Set 5: API Mocking
//===================

//5.1 Refactor to POM
//====================

test('แสดง error เมื่อ API ล่ม', async({page}) => {
  await page.route('**/api/stats', route =>
    route.fulfill({ status: 500 })
  );
  await page.goto('/dashboard');
  await expect(page.getByText('Unable to load')).toBeVisible();
});


//5.2 Verify Request + Pure API 
//=============================

// 5.2 Verify search request
const [req] = await Promise.all([
  page.waitForRequest(r => r.url().includes('/api/search')),
  page.getByRole('searchbox').fill('iPhone').then(() =>
    page.keyboard.press('Enter')
  )
]);
expect(req.url()).toContain('q=iPhone');

// 5.3 Pure API
test('GET /api/users/2', async({request}) => {
  const res = await request.get('https://reqres.in/api/users/2');
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.data.id).toBe(2);
});



//===================
//Set 6: E2E Complete
//===================

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