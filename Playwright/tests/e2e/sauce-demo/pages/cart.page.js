export class CartPage {
  constructor(page) {
    this.cartList = page.locator('[data-test="cart-list"]');
    this.backpackItem = page.locator('[data-test="inventory-item-name"]', {
      hasText: 'Sauce Labs Backpack',
    });
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
