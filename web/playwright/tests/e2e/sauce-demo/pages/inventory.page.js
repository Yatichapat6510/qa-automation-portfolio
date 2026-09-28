export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.addBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async addBackpackToCart() {
    await this.addBackpackButton.click();
  }

  async openCart() {
    await this.shoppingCartLink.click();
  }
}
