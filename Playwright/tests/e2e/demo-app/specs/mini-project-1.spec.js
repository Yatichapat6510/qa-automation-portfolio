import { test as base, expect } from '../fixtures/demo-app.fixture.js';

// นำเข้า Playwright test และ expect สำหรับ assertion
class BasePage {
  constructor(page) {
    this.page = page;
  }

  // ฟังก์ชันเปิดหน้าเว็บหลักของแอป
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }
}

// Page object สำหรับหน้าล็อกอิน
class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginBtn = page.locator('#login-button');
    this.errorMsg = page.locator('h3[data-test="error"]');
  }

  // กรอกชื่อผู้ใช้และรหัสผ่าน แล้วคลิกล็อกอิน
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  // ตรวจสอบข้อความผิดพลาดบนหน้าล็อกอิน
  async expectError(message) {
    await expect(this.errorMsg).toBeVisible();
    await expect(this.errorMsg).toHaveText(message);
  }
}

// Page object สำหรับหน้ารายการสินค้า
class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.title = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.sortSelect = page.locator('[data-test="product_sort_container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.burger = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  // ยืนยันว่าอยู่บนหน้ารายการสินค้าจริง
  async isVisible() {
    await expect(this.title).toHaveText('Products');
  }

  // เลือกการเรียงลำดับสินค้า
  async sortBy(value) {
    await this.sortSelect.selectOption(value);
  }

  // เพิ่มสินค้าลงตะกร้า โดยค้นหาจากชื่อสินค้า
  async addToCart(productName) {
    await this.page.locator(`.inventory_item:has-text("${productName}") button`).click();
  }

  // คลิกปุ่มเดียวกันเพื่อลบสินค้าจากตะกร้า
  async removeFromCart(productName) {
    await this.page.locator(`.inventory_item:has-text("${productName}") button`).click();
  }

  // นับจำนวนสินค้าทั้งหมดบนหน้า
  async itemCount() {
    return this.inventoryItems.count();
  }

  // ดึงชื่อสินค้าทั้งหมดเป็น array
  async itemNames() {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  // ดึงราคาสินค้าทั้งหมดเป็น array
  async itemPrices() {
    return this.page.locator('.inventory_item_price').allTextContents();
  }

  // เปิดหน้าตะกร้าสินค้า
  async openCart() {
    await this.page.click('.shopping_cart_link');
  }

  // ทำการ logout ผ่านเมนูแฮมเบอร์เกอร์
  async logout() {
    await this.burger.click();
    await this.logoutLink.click();
  }
}

// Page object สำหรับหน้าตะกร้า
class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.checkoutBtn = page.locator('[data-test="checkout"]');
  }

  // นับจำนวนรายการในตะกร้า
  async itemCount() {
    return this.cartItems.count();
  }

  // คลิกปุ่ม checkout
  async checkout() {
    await this.checkoutBtn.click();
  }

  // ลบสินค้าจากตะกร้าตามชื่อ
  async removeItem(productName) {
    await this.page.locator(`.cart_item:has-text("${productName}") button`).click();
  }
}

// Page object สำหรับหน้าชำระเงิน
class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
    this.finishBtn = page.locator('[data-test="finish"]');
    this.errorMsg = page.locator('[data-test="error"]');
    this.completeHeader = page.locator('.complete-header');
  }

  // กรอกข้อมูลส่วนตัวสำหรับการสั่งซื้อ
  async fillInformation(firstName, lastName, postalCode) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  // คลิกปุ่ม continue เพื่อไปขั้นตอนถัดไป
  async continue() {
    await this.continueBtn.click();
  }

  // คลิกปุ่ม finish เพื่อส่งคำสั่งซื้อ
  async finish() {
    await this.finishBtn.click();
  }
}

// สร้าง fixtures สำหรับแต่ละหน้า เพื่อใช้ในแต่ละ test
const test = base.extend({
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
  }
});

// ข้อมูลผู้ใช้สำหรับทดสอบ
const VALID_USER = 'standard_user';
const VALID_PASSWORD = 'secret_sauce';
const LOCKED_USER = 'locked_out_user';

test.describe('auth.spec.js', () => {
  // กลุ่มการทดสอบล็อกอินและการออกจากระบบ
  test('login successful', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(VALID_USER, VALID_PASSWORD);
    await inventoryPage.isVisible();
  });

  test('login fails with wrong password', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(VALID_USER, 'wrong_password');
    await loginPage.expectError('Epic sadface: Username and password do not match any user in this service');
  });

  test('locked user cannot login', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(LOCKED_USER, VALID_PASSWORD);
    await loginPage.expectError('Epic sadface: Sorry, this user has been locked out.');
  });

  test('logout returns to login page', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(VALID_USER, VALID_PASSWORD);
    await inventoryPage.isVisible();
    await inventoryPage.logout();
    await expect(loginPage.loginBtn).toBeVisible();
  });
});

test.describe('inventory.spec.js', () => {
  // กลุ่มการทดสอบหน้ารายการสินค้า
  test('shows six products', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(VALID_USER, VALID_PASSWORD);
    expect(await inventoryPage.itemCount()).toBe(6);
  });

  test('sort price low to high', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(VALID_USER, VALID_PASSWORD);
    await inventoryPage.sortBy('lohi');
    const prices = (await inventoryPage.itemPrices()).map(value => parseFloat(value.replace(/[^0-9.]/g, '')));
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('sort name A to Z', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(VALID_USER, VALID_PASSWORD);
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.itemNames();
    expect(names[0]).toContain('Sauce Labs Backpack');
    expect(names[names.length - 1]).toContain('Test.allTheThings() T-Shirt (Red)');
  });

  test('products have name, price, and image', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(VALID_USER, VALID_PASSWORD);
    const count = await inventoryPage.itemCount();
    for (let index = 0; index < count; index++) {
      const item = inventoryPage.inventoryItems.nth(index);
      await expect(item.locator('.inventory_item_name')).toBeVisible();
      await expect(item.locator('.inventory_item_price')).toBeVisible();
      await expect(item.locator('.inventory_item_img img')).toBeVisible();
    }
  });
});

test.describe('cart.spec.js', () => {
  // กลุ่มการทดสอบตะกร้าสินค้า
  test('add one product updates badge to 1', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(VALID_USER, VALID_PASSWORD);
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('add two products updates badge to 2', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(VALID_USER, VALID_PASSWORD);
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.addToCart('Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  test('remove product clears cart badge', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(VALID_USER, VALID_PASSWORD);
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await inventoryPage.removeFromCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toBeHidden();
  });
});

test.describe('checkout.spec.js', () => {
  // กลุ่มการทดสอบการสั่งซื้อและ checkout
  test('checkout full flow shows success message', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.goto();
    await loginPage.login(VALID_USER, VALID_PASSWORD);
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation('QA', 'Tester', '90210');
    await checkoutPage.continue();
    await checkoutPage.finish();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('checkout without information shows error', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.goto();
    await loginPage.login(VALID_USER, VALID_PASSWORD);
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.continue();
    await expect(checkoutPage.errorMsg).toHaveText('Error: First Name is required');
  });
});
