class InventoryPage {
  get title()        { return cy.get('.title') }
  get items()        { return cy.get('.inventory_item') }
  get cartBadge()    { return cy.get('.shopping_cart_badge') }
  get cartIcon()     { return cy.get('.shopping_cart_link') }
  get sortDropdown() { return cy.get('[data-test="product-sort-container"]') }

  addItemToCart(index = 0) {
    this.items.eq(index).find('button').click()
    return this
  }

  sortBy(value) {
    this.sortDropdown.select(value)
    return this
  }

  goToCart() {
    this.cartIcon.click()
    return this
  }

  shouldHaveItemCount(count) {
    this.items.should('have.length', count)
    return this
  }
}

export default new InventoryPage()