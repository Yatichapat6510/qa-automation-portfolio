import loginPage from '../../pages/LoginPage'
import inventoryPage from '../../pages/InventoryPage'
import cartPage from '../../pages/CartPage'

describe('Complete Purchase Flow (POM)', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('complete purchase flow ด้วย POM', () => {
    loginPage.loginAs('standard_user', 'secret_sauce')
    inventoryPage
      .addItemToCart(0)
      .addItemToCart(1)
      .addItemToCart(2)
      .goToCart()
    cartPage
      .shouldHaveItemCount(3)
      .removeItem(0)
      .shouldHaveItemCount(2)
      .checkout()
    cy.url().should('include', 'checkout-step-one')
  })
})