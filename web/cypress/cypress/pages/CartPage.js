class CartPage {
  get cartItems()         { return cy.get('.cart_item') }
  get checkoutButton()    { return cy.get('[data-test="checkout"]') }
  get continueButton()    { return cy.get('[data-test="continue-shopping"]') }

  removeItem(index = 0) {
    this.cartItems.eq(index).find('button').click()
    return this
  }

  shouldHaveItemCount(count) {
    this.cartItems.should('have.length', count)
    return this
  }

  checkout() {
    this.checkoutButton.click()
    return this
  }
}
export default new CartPage()