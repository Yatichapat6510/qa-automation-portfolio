// class LoginPage {
//   // === SELECTORS (เปลี่ยนที่นี่ที่เดียว) ===
//   get usernameField() { return cy.get('#user-name') }
//   get passwordField() { return cy.get('#password') }
//   get loginButton()   { return cy.get('#login-button') }
//   get errorMessage()  { return cy.get('[data-test="error"]') }

//   // === ACTIONS (combine หลาย step) ===
//   visit() {
//     cy.visit('/')
//     return this  // return this เพื่อ chain ได้
//   }

//   fillUsername(username) {
//     this.usernameField.clear().type(username)
//     return this
//   }

//   fillPassword(password) {
//     this.passwordField.clear().type(password)
//     return this
//   }

//   submit() {
//     this.loginButton.click()
//     return this
//   }

//   loginAs(username, password) {
//     return this
//       .visit()
//       .fillUsername(username)
//       .fillPassword(password)
//       .submit()
//   }

//   // === ASSERTIONS ===
//   shouldShowError(message) {
//     this.errorMessage
//       .should('be.visible')
//       .and('contain', message)
//     return this
//   }
// }

// export default new LoginPage()




class LoginPage {
  get usernameField() { return cy.get('#user-name') }
  get passwordField() { return cy.get('#password') }
  get loginButton()   { return cy.get('#login-button') }
  get errorMessage()  { return cy.get('[data-test="error"]') }
  get errorDismiss()  { return cy.get('[data-test="error-button"]') }

  visit()                { cy.visit('/'); return this }
  fillUsername(u)        { this.usernameField.clear().type(u); return this }
  fillPassword(p)        { this.passwordField.clear().type(p); return this }
  submit()               { this.loginButton.click(); return this }
  dismissError()         { this.errorDismiss.click(); return this }
  loginAs(u, p)          { return this.visit().fillUsername(u).fillPassword(p).submit() }
  shouldShowError(msg)   { this.errorMessage.should('be.visible').and('contain', msg); return this }

  shouldNotShowError()   { this.errorMessage.should('not.exist'); return this }

}
export default new LoginPage()

