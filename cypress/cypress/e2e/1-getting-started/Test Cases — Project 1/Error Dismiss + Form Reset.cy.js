// ทดสอบว่ากดปุ่ม X บน error message แล้ว error หายไป และสามารถพิมพ์ credential ใหม่ได้


it('error dismiss ทำงานถูกต้อง', () => {
  cy.visit('/')
  cy.get('#login-button').click()
  cy.get('[data-test="error"]').should('be.visible')
  cy.get('[data-test="error-button"]').click()
  cy.get('[data-test="error"]').should('not.exist')
  // ยังสามารถ login สำเร็จได้หลัง dismiss
  cy.login('standard_user', 'secret_sauce')
  cy.url().should('include', '/inventory.html')
})