// InventoryPage + CartPage : สร้าง POM สำหรับ product cart

// pages/InventoryPage.js

export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.pageTitle    = page.locator('.title');
    this.productItems = page.locator('.inventory_item');
    this.cartBadge    = page.locator('.shopping_cart_badge');
    this.cartLink     = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('.product_sort_container');
  }

  async addToCartByName(productName) {
    const item = this.productItems
      .filter({ hasText: productName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async expectCartCount(count) {
    await expect(this.cartBadge).toHaveText(String(count));
  }
}

// pages/CartPage.js
export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems    = page.locator('.cart_item');
    this.checkoutBtn  = page.locator('[data-test="checkout"]');
  }

  async expectItemCount(n) {
    await expect(this.cartItems).toHaveCount(n);
  }

  async proceedToCheckout() {
    await this.checkoutBtn.click();
  }
}

// ใน test — อ่านง่ายมาก
test('add 2 items and checkout', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.loginAsStandardUser();

  const inv = new InventoryPage(page);
  await inv.addToCartByName('Sauce Labs Backpack');
  await inv.addToCartByName('Sauce Labs Bike Light');
  await inv.expectCartCount(2);
  await inv.goToCart();

  const cart = new CartPage(page);
  await cart.expectItemCount(2);
  await cart.proceedToCheckout();
});