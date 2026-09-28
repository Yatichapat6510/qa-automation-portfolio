/**
 * 🎓 QA Workshop: Playwright E2E Tests สำหรับมือใหม่
 * =====================================================
 * ภาษา:   JavaScript (CommonJS)
 * Target: https://www.saucedemo.com
 * Pattern: Page Object Model (POM)
 *
 * 📚 วิธีรัน:
 *   npm install
 *   npx playwright install chromium
 *   npx playwright test
 *   npx playwright show-report   ← ดู HTML Report
 *
 * 🔑 Test Accounts:
 *   Username: standard_user  | Password: secret_sauce
 *   Locked:   locked_out_user
 *
 * 📁 โครงสร้างไฟล์:
 *   pages/LoginPage.js      ← Page Object ของหน้า Login
 *   pages/ProductsPage.js   ← Page Object ของหน้า Products
 *   pages/CheckoutPage.js   ← Page Object ของหน้า Checkout
 *   tests/saucedemo.spec.js ← ไฟล์นี้ (Test Cases)
 *
 * 💡 JavaScript vs TypeScript:
 *   JS ไม่ต้องประกาศ type เช่น string, number
 *   ใช้ได้ง่ายกว่า เหมาะสำหรับมือใหม่
 */

// @ts-check  ← เปิดใช้ Type Hints แม้เป็น .js (ไม่บังคับ แต่ช่วย IDE ได้)
const { test, expect } = require('@playwright/test');
const { LoginPage }    = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CheckoutPage } = require('../pages/CheckoutPage');


// ═══════════════════════════════════════════════════
// 📘 บทที่ 1: Login Tests
// ═══════════════════════════════════════════════════

test.describe('📘 บทที่ 1: Login', () => {

  // beforeEach = รันก่อนทุก test ใน describe block นี้
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // ─────────────────────────────────────────────────
  test('TC-001: Login สำเร็จด้วย credentials ถูกต้อง', async ({ page }) => {
    // ── Arrange (เตรียมข้อมูล) ──
    const loginPage = new LoginPage(page);

    // ── Act (ทำ Action) ──
    await loginPage.login('standard_user', 'secret_sauce');

    // ── Assert (ตรวจสอบผลลัพธ์) ──
    // ✅ URL ต้องมี /inventory
    await expect(page).toHaveURL(/inventory/);
    // ✅ ต้องเห็นหัวข้อ Products
    await expect(page.locator('.title')).toContainText('Products');
  });

  // ─────────────────────────────────────────────────
  test('TC-002: Login ล้มเหลว - Account ถูก Lock', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // ใช้ locked_out_user ที่ถูก lock
    await loginPage.login('locked_out_user', 'secret_sauce');

    // ✅ ต้องเห็น Error Message
    await expect(loginPage.errorMessage).toBeVisible();
    const error = await loginPage.getError();
    expect(error).toContain('locked out');
  });

  // ─────────────────────────────────────────────────
  test('TC-003: Login ล้มเหลว - ไม่กรอก Username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // กด Login โดยไม่กรอกอะไรเลย
    await loginPage.loginButton.click();

    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  // ─────────────────────────────────────────────────
  test('TC-004: Login ล้มเหลว - Password ผิด', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'wrong_password');

    await expect(loginPage.errorMessage).toContainText('do not match');
  });

  // ─────────────────────────────────────────────────
  test('TC-005: Login ล้มเหลว - ไม่กรอก Password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // กรอกแค่ username
    await page.fill('#user-name', 'standard_user');
    await loginPage.loginButton.click();

    await expect(loginPage.errorMessage).toContainText('Password is required');
  });

});


// ═══════════════════════════════════════════════════
// 📗 บทที่ 2: Products Page
// ═══════════════════════════════════════════════════

test.describe('📗 บทที่ 2: Products', () => {

  // ทุก test ใน block นี้ต้อง Login ก่อน
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  // ─────────────────────────────────────────────────
  test('TC-006: หน้า Products แสดงสินค้า 6 ชิ้น', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // นับจำนวนสินค้าในหน้า
    const count = await productsPage.productItems.count();
    expect(count).toBe(6);
  });

  // ─────────────────────────────────────────────────
  test('TC-007: เพิ่มสินค้าเข้า Cart - Badge แสดงเลข 1', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // ก่อนเพิ่ม: Cart ต้องว่าง (ไม่มี Badge)
    await expect(productsPage.cartBadge).not.toBeVisible();

    // กด Add to Cart
    await productsPage.addFirstItemToCart();

    // หลังเพิ่ม: Badge ต้องแสดงเลข 1
    await expect(productsPage.cartBadge).toBeVisible();
    await expect(productsPage.cartBadge).toContainText('1');
  });

  // ─────────────────────────────────────────────────
  test('TC-008: ลบสินค้าออกจาก Cart - Badge หายไป', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // เพิ่มก่อน แล้วตรวจว่า Badge แสดง
    await productsPage.addFirstItemToCart();
    await expect(productsPage.cartBadge).toContainText('1');

    // ลบออก
    await productsPage.removeFirstItemFromCart();

    // Badge ต้องหายไป (Cart ว่าง)
    await expect(productsPage.cartBadge).not.toBeVisible();
  });

  // ─────────────────────────────────────────────────
  test('TC-009: สินค้ามีชื่อ ราคา และปุ่ม Add to Cart', async ({ page }) => {
    // ตรวจว่าสินค้าชิ้นแรกมี element ครบ
    await expect(page.locator('.inventory_item_name').first()).toBeVisible();
    await expect(page.locator('.inventory_item_price').first()).toBeVisible();
    await expect(page.locator('[data-test*="add-to-cart"]').first()).toBeVisible();
  });

});


// ═══════════════════════════════════════════════════
// 📕 บทที่ 3: E2E Checkout
// ═══════════════════════════════════════════════════

test.describe('📕 บทที่ 3: Checkout E2E', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  // ─────────────────────────────────────────────────
  test('TC-010: กระบวนการ Checkout สมบูรณ์ทั้งหมด', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    // ขั้นตอน 1: เพิ่มสินค้า
    await productsPage.addFirstItemToCart();
    expect(await productsPage.getCartCount()).toBe(1);

    // ขั้นตอน 2: ไปหน้า Cart
    await productsPage.goToCart();
    await expect(page).toHaveURL(/cart/);

    // ขั้นตอน 3: กด Checkout
    await checkoutPage.checkoutButton.click();
    await expect(page).toHaveURL(/checkout-step-one/);

    // ขั้นตอน 4: กรอกข้อมูล Shipping
    await checkoutPage.fillInfo('สมชาย', 'ใจดี', '10110');
    await expect(page).toHaveURL(/checkout-step-two/);

    // ขั้นตอน 5: กด Finish ยืนยัน
    await checkoutPage.finish();
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(checkoutPage.completeHeader).toContainText('Thank you for your order!');
  });

  // ─────────────────────────────────────────────────
  test('TC-011: Checkout ต้องกรอก First Name', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    await productsPage.addFirstItemToCart();
    await productsPage.goToCart();
    await checkoutPage.checkoutButton.click();

    // ไม่กรอก First Name (กรอกแค่ Last Name และ Zip)
    await checkoutPage.lastNameInput.fill('ใจดี');
    await checkoutPage.zipInput.fill('10110');
    await checkoutPage.continueButton.click();

    // ต้องเห็น Error
    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });

});
