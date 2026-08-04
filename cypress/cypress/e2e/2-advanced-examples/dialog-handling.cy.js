describe('Dialog Handling', () => {
  // ⚠️ ไฟล์นี้เป็น syntax reference สาธิตการใช้คำสั่ง Cypress เท่านั้น
  // selector (#order-btn, #delete-btn, .item, .alert-trigger)
  // เป็นของสมมติ ไม่มีอยู่จริงบนหน้าใดของ SauceDemo และไฟล์นี้ไม่มี cy.visit() ที่ถูกต้อง
  // จึง .skip() ไว้ทั้งหมดเพื่อไม่ให้ fail ใน CI — ถ้าจะให้รันจริงต้องเขียนใหม่ให้ตรงกับ UI จริง

  it.skip('ตรวจ text ของ window alert', () => {
    // ตรวจ text ของ alert
    cy.on('window:alert', (text) => {
      expect(text).to.include('ยืนยันการสั่งซื้อ')
    })
    cy.get('#order-btn').click()
  })

  it.skip('confirm dialog — กด Cancel (ส่งคืน false)', () => {
    // Confirm dialog — กด Cancel (ส่งคืน false)
    cy.on('window:confirm', () => false)  // Cancel
    cy.get('#delete-btn').click()
    cy.get('.item').should('exist')  // ยังอยู่เพราะ cancel
  })

  it.skip('confirm dialog — กด OK (ส่งคืน true)', () => {
    // Confirm dialog — กด OK (ส่งคืน true)
    cy.on('window:confirm', () => true)   // OK
    cy.get('#delete-btn').click()
    cy.get('.item').should('not.exist')   // ลบแล้ว
  })

  it.skip('window:before:load — stub window property ก่อนหน้า load', () => {
    // window:before:load — stub window property ก่อนหน้า load
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win, 'alert').as('winAlert')
      }
    })
    cy.get('.alert-trigger').click()
    cy.get('@winAlert').should('have.been.calledOnce')
  })
})
