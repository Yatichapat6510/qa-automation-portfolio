// Pattern 1: forEach บน array
describe('Login Scenarios (data-driven)', () => {
  const loginScenarios = [
    { user: 'standard_user',  pass: 'secret_sauce', expect: 'success' },
    { user: 'locked_out_user', pass: 'secret_sauce', expect: 'locked' },
    { user: 'wrong_user',      pass: 'wrong',        expect: 'mismatch' },
  ]

  loginScenarios.forEach((scenario) => {
    it(`login scenario: ${scenario.expect}`, () => {
      cy.visit('/')
      cy.get('#user-name').type(scenario.user)
      cy.get('#password').type(scenario.pass)
      cy.get('#login-button').click()

      if (scenario.expect === 'success') {
        cy.url().should('include', '/inventory.html')
      } else {
        cy.get('[data-test="error"]').should('be.visible')
      }
    })
  })
})

// Pattern 2: โหลดจาก fixture แล้ว forEach
describe('Invalid Login', () => {
  beforeEach(() => cy.visit('/'))

  it('ทดสอบทุก invalid case จาก fixture', () => {
    // use the updated fixture file
    cy.fixture('users-v2').then((data) => {
      data.invalidUsers.forEach((user) => {
        // always clear the username field first
        cy.get('#user-name').clear()
        if (user.username) cy.get('#user-name').type(user.username)
        cy.get('#password').clear().type(user.password)
        cy.get('#login-button').click()
        cy.get('[data-test="error"]').should('contain', user.error)
        cy.get('[data-test="error-button"]').click() // dismiss error
      })
    })
  })
})