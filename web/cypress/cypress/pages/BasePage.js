class BasePage {
  // method ที่ทุกหน้าใช้
  waitForPageLoad() {
    cy.get('body').should('be.visible')
    return this
  }

  getPageTitle() {
    return cy.title()
  }

  navigateTo(path) {
    cy.visit(path)
    return this
  }
}

// LoginPage extends BasePage
class LoginPage extends BasePage {
  get usernameField() { return cy.get('#user-name') }
  // ... rest of LoginPage
}

export { BasePage }
export default new LoginPage()