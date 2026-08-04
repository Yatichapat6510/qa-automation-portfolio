describe('Force Actions', () => {
  // ⚠️ ไฟล์นี้เป็น syntax reference สาธิตการใช้คำสั่ง Cypress เท่านั้น
  // selector (.overlapped-btn, .hidden-input, .custom-checkbox, #editor, #email, .error)
  // เป็นของสมมติ ไม่มีอยู่จริงบนหน้าใดของ SauceDemo และไฟล์นี้ไม่มี cy.visit()
  // จึง .skip() ไว้ทั้งหมดเพื่อไม่ให้ fail ใน CI — ถ้าจะให้รันจริงต้องเขียนใหม่ให้ตรงกับ UI จริง

  it.skip('force click / force type / force check', () => {
    // บังคับคลิกแม้ Cypress คิดว่า element ไม่ actionable
    cy.get('.overlapped-btn').click({ force: true })

    // บังคับ type แม้ field ถูกซ่อนบางส่วน
    cy.get('.hidden-input').type('text', { force: true })

    // บังคับ check
    cy.get('.custom-checkbox').check({ force: true })
  })

  it.skip('keyboard shortcuts และ focus/blur', () => {
    // Ctrl+A (select all) แล้วลบ
    cy.get('#editor').type('{ctrl}a{del}')

    // Cmd+S (save) บน Mac
    cy.get('body').type('{cmd}s')

    // กด Tab เพื่อเปลี่ยน focus ไป field ถัดไป
    cy.get('#username').type('user{enter}')
    cy.focused().type('password')  // .focused() = element ที่ focus อยู่

    // focus เข้า field โดยไม่พิมพ์อะไร (ทดสอบ validation onFocus)
    cy.get('#email').focus()

    // blur ออกจาก field (ทดสอบ validation onBlur)
    cy.get('#email').type('invalid-email').blur()
    cy.get('.error').should('be.visible')
  })
})
