/**
 * 🎓 QA Workshop: Playwright E2E Tests สำหรับมือใหม่
 * =====================================================
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
 *   Username: standard_user | Password: secret_sauce
 *   Locked:   locked_out_user
 */

import { test, expect, Page } from '@playwright/test';

// ═══════════════════════════════════════════════════
// 📦 PAGE OBJECTS
// Page Object = Class ที่ห่อหุ้ม Element และ Action
// ทำให้ Test อ่านง่าย และแก้ไขง่ายเมื่อ UI เปลี่ยน
// ═══════════════════════════════════════════════════

/**
 * LoginPage: จัดการทุกอย่างบนหน้า Login
 */
class LoginPage {
  readonly url = 'https://www.saucedemo.com';

  // Element Locators (เก็บไว้ที่เดียว ง่ายต่อการแก้)
  readonly usernameInput;
  readonly passwordInput;
  readonly loginButton;
  readonly errorMessage;

  constructor(private page: Page) {
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton   = page.locator('#login-button');
    this.errorMessage  = page.locator('[data-test="error"]');
  }

  /** เปิดหน้า Login */
  async goto() {
    await this.page.goto(this.url);
  }

  /** Login ด้วย username และ password ที่ระบุ */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** อ่านข้อความ Error */
  async getError(): Promise<string> {
    return (await this.errorMessage.textContent()) ?? '';
  }
}

/**
 * ProductsPage: จัดการหน้า Products
 */
class ProductsPage {
  readonly productItems;
  readonly cartBadge;
  readonly cartIcon;

  constructor(private page: Page) {
    this.productItems = page.locator('.inventory_item');
    this.cartBadge    = page.locator('.shopping_cart_badge');
    this.cartIcon     = page.locator('.shopping_cart_link');
  }

  /** เพิ่มสินค้าชิ้นแรกเข้า Cart */
  async addFirstItemToCart() {
    await this.page
      .locator('.inventory_item:first-child [data-test*="add-to-cart"]')
      .click();
  }

  /** ดูจำนวนใน Cart Badge */
  async getCartCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.textContent();
      return parseInt(text || '0');
    }
    return 0;
  }

  /** ไปหน้า Cart */
  async goToCart() {
    await this.cartIcon.click();
  }
}

/**
 * CheckoutPage: จัดการหน้า Checkout
 */
class CheckoutPage {
  constructor(private page: Page) {}

  /** กรอกข้อมูล Shipping */
  async fillInfo(firstName: string, lastName: string, zip: string) {
    await this.page.fill('#first-name', firstName);
    await this.page.fill('#last-name', lastName);
    await this.page.fill('#postal-code', zip);
    await this.page.click('#continue');
  }

  /** กด Finish เพื่อยืนยันคำสั่งซื้อ */
  async finish() {
    await this.page.click('#finish');
  }
}


// ═══════════════════════════════════════════════════
// 📘 บทที่ 1: Login Tests
// ═══════════════════════════════════════════════════

test.describe('📘 บทที่ 1: Login', () => {

  // beforeEach = รันก่อนทุก test ใน describe block นี้
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC-001: Login สำเร็จด้วย credentials ถูกต้อง', async ({ page }) => {
    // Arrange (เตรียม)
    const loginPage = new LoginPage(page);

    // Act (ทำ)
    await loginPage.login('standard_user', 'secret_sauce');

    // Assert (ตรวจสอบ)
    // ✅ URL ต้องมี /inventory
    await expect(page).toHaveURL(/inventory/);
    // ✅ ต้องเห็นหัวข้อ Products
    await expect(page.locator('.title')).toContainText('Products');
  });

  test('TC-002: Login ล้มเหลว - Account ถูก Lock', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('locked_out_user', 'secret_sauce');

    // ✅ ต้องเห็น Error Message
    await expect(loginPage.errorMessage).toBeVisible();
    const error = await loginPage.getError();
    expect(error).toContain('locked out');
  });

  test('TC-003: Login ล้มเหลว - ไม่กรอก Username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // กด Login โดยไม่กรอกอะไร
    await loginPage.loginButton.click();

    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('TC-004: Login ล้มเหลว - Password ผิด', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'wrong_password');

    await expect(loginPage.errorMessage).toContainText('do not match');
  });

  test('TC-005: Login ล้มเหลว - ไม่กรอก Password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.fill('#user-name', 'standard_user');
    // ไม่กรอก password
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
    // รอให้โหลดเสร็จ
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC-006: หน้า Products แสดงสินค้า 6 ชิ้น', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // นับจำนวนสินค้า
    const count = await productsPage.productItems.count();
    expect(count).toBe(6);
  });

  test('TC-007: เพิ่มสินค้าเข้า Cart - Badge แสดงเลข 1', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // ก่อนเพิ่ม: Cart ต้องว่าง
    await expect(productsPage.cartBadge).not.toBeVisible();

    // เพิ่มสินค้า
    await productsPage.addFirstItemToCart();

    // หลังเพิ่ม: Badge ต้องแสดงเลข 1
    await expect(productsPage.cartBadge).toBeVisible();
    await expect(productsPage.cartBadge).toContainText('1');
  });

  test('TC-008: ลบสินค้าออกจาก Cart - Badge หายไป', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // เพิ่มก่อน
    await productsPage.addFirstItemToCart();
    await expect(productsPage.cartBadge).toContainText('1');

    // ลบออก
    await page
      .locator('.inventory_item:first-child [data-test*="remove"]')
      .click();

    // Badge ต้องหายไป
    await expect(productsPage.cartBadge).not.toBeVisible();
  });

  test('TC-009: สินค้ามีชื่อ ราคา และปุ่ม Add to Cart', async ({ page }) => {
    // ตรวจว่าสินค้าแต่ละชิ้นมีข้อมูลครบ
    await expect(page.locator('.inventory_item_name').first()).toBeVisible();
    await expect(page.locator('.inventory_item_price').first()).toBeVisible();
    await expect(
      page.locator('[data-test*="add-to-cart"]').first()
    ).toBeVisible();
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

  test('TC-010: กระบวนการ Checkout สมบูรณ์ทั้งหมด', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    // ขั้นตอน 1: เพิ่มสินค้า
    await productsPage.addFirstItemToCart();
    expect(await productsPage.getCartCount()).toBe(1);

    // ขั้นตอน 2: ไป Cart
    await productsPage.goToCart();
    await expect(page).toHaveURL(/cart/);

    // ขั้นตอน 3: กด Checkout
    await page.click('#checkout');
    await expect(page).toHaveURL(/checkout-step-one/);

    // ขั้นตอน 4: กรอกข้อมูล
    await checkoutPage.fillInfo('สมชาย', 'ใจดี', '10110');
    await expect(page).toHaveURL(/checkout-step-two/);

    // ขั้นตอน 5: ยืนยัน
    await checkoutPage.finish();
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(page.locator('.complete-header')).toContainText(
      'Thank you for your order!'
    );
  });

  test('TC-011: Checkout ต้องกรอก First Name', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.addFirstItemToCart();
    await productsPage.goToCart();
    await page.click('#checkout');

    // ไม่กรอก First Name
    await page.fill('#last-name', 'ใจดี');
    await page.fill('#postal-code', '10110');
    await page.click('#continue');

    // ต้องเห็น Error
    await expect(page.locator('[data-test="error"]')).toContainText(
      'First Name is required'
    );
  });
});
