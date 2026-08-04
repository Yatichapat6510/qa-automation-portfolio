// วิธีที่ 1: โหลดใน beforeEach (แนะนำสำหรับ shared data)
describe('Login Tests', () => {
  let userData

  beforeEach(() => {
    cy.fixture('users v2').then((data) => {
      userData = data
    })
    cy.visit('/')
  })

  it('login ด้วย standard_user', () => {
    cy.get('#user-name').type(userData.validUsers[0].username)
    cy.get('#password').type(userData.validUsers[0].password)
    cy.get('#login-button').click()
    cy.url().should('include', '/inventory.html')
  })

  // วิธีที่ 2: โหลดใน test โดยตรง
  it('login test', () => {
    cy.visit('/')
    cy.fixture('users v2').then((data) => {
      const user = data.validUsers[0]
      cy.get('#user-name').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
    })
  })
})