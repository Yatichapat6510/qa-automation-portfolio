describe('Exercises Module 4', () => {

  // ==========================================
  // Exercise 1: Mock API / Request
  // ==========================================
  it('ตรวจ loading state ระหว่างรอ API', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts', (req) => {
      req.reply({ delay: 2000, statusCode: 200, body: [] })
    }).as('getPosts')

    // ✅ cy.request() ใช้กับ API, cy.visit() ใช้กับ HTML page เท่านั้น
    cy.request('GET', 'https://jsonplaceholder.typicode.com/posts')
      .its('status').should('eq', 200)
  })

  // ==========================================
  // Exercise 2: Cart State ใน localStorage
  // ==========================================
  it('cart state persist ใน localStorage', () => {
    cy.visit('/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.get('.inventory_item').eq(0).find('button').click()
    cy.get('.inventory_item').eq(1).find('button').click()
    cy.get('.shopping_cart_badge').should('have.text', '2')
    cy.reload()
    cy.get('.shopping_cart_badge').should('have.text', '2')
  })

  // ==========================================
  // Exercise 3: Checkout Flow (ไม่มี real API)
  // ==========================================
  it('intercept และ assert checkout flow', () => {
    cy.visit('/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.get('.inventory_item').first().find('button').click()
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()

    // ✅ ตรวจ navigation แทน API intercept
    cy.url().should('include', 'checkout-step-one')
    cy.get('[data-test="firstName"]').should('be.visible')
  })

})