// ใช้ fixture + forEach loop ทดสอบ error case ทุกข้อในไฟล์เดียว ไม่เขียน it() แยกกัน 4 ข้อ


describe('Login Error Cases (Data-Driven)', () => {
  beforeEach(() => cy.visit('/'))

  it('ทดสอบ error ทุก case จาก fixture', () => {
    cy.fixture('login-data').then((d) => {
      d.errorCases.forEach((c) => {
        if (c.user) cy.get('#user-name').clear().type(c.user)
        if (c.pass) cy.get('#password').clear().type(c.pass)
        cy.get('#login-button').click()
        cy.get('[data-test="error"]')
          .should('be.visible')
          .and('contain', c.msg)
        // dismiss error แล้ว reset form
        cy.get('[data-test="error-button"]').click()
        cy.get('[data-test="error"]').should('not.exist')
        cy.get('#user-name').clear()
        cy.get('#password').clear()
      })
    })
  })
})