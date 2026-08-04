/**
 * 📦 Page Object: ProductsPage
 */

class ProductsPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;

    // ── Locators ──────────────────────────────────────
    this.productItems       = page.locator('.inventory_item');
    this.cartBadge          = page.locator('.shopping_cart_badge');
    this.cartIcon           = page.locator('.shopping_cart_link');
    this.firstAddToCartBtn  = page.locator('.inventory_item:first-child [data-test*="add-to-cart"]');
    this.firstRemoveBtn     = page.locator('.inventory_item:first-child [data-test*="remove"]');
  }

  /** เพิ่มสินค้าชิ้นแรกเข้า Cart */
  async addFirstItemToCart() {
    await this.firstAddToCartBtn.click();
  }

  /** ลบสินค้าชิ้นแรกออกจาก Cart */
  async removeFirstItemFromCart() {
    await this.firstRemoveBtn.click();
  }

  /**
   * ดูจำนวนสินค้าใน Cart Badge
   * @returns {Promise<number>}
   */
  async getCartCount() {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.textContent();
      return parseInt(text || '0');
    }
    return 0;
  }

  /** คลิก Cart Icon ไปหน้า Cart */
  async goToCart() {
    await this.cartIcon.click();
  }
}

module.exports = { ProductsPage };
