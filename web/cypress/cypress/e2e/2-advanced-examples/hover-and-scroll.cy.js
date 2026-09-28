describe('Hover & Scroll', () => {
  // ⚠️ ไฟล์นี้เป็น syntax reference สาธิตการใช้คำสั่ง Cypress เท่านั้น
  // selector (.menu-item, .dropdown-trigger, .submenu, #footer-link, .scrollable-panel)
  // เป็นของสมมติ ไม่มีอยู่จริงบนหน้าใดของ SauceDemo และไฟล์นี้ไม่มี cy.visit()
  // จึง .skip() ไว้ทั้งหมดเพื่อไม่ให้ fail ใน CI — ถ้าจะให้รันจริงต้องเขียนใหม่ให้ตรงกับ UI จริง

  it.skip('trigger mouseover / mouseenter เพื่อเปิด submenu', () => {
    // trigger mouseover event
    cy.get('.menu-item').trigger('mouseover')

    // บาง UI ต้อง trigger หลาย event ต่อกัน
    cy.get('.dropdown-trigger')
      .trigger('mouseover')
      .trigger('mouseenter')

    // แล้วรอ submenu ปรากฏก่อนค่อย interact ต่อ
    cy.get('.submenu').should('be.visible')
      .find('.submenu-item').first().click()
  })

  it.skip('scrollIntoView และ scrollTo', () => {
    // scroll ไปหา element (ปกติ Cypress ทำให้อัตโนมัติก่อน click/type อยู่แล้ว)
    cy.get('#footer-link').scrollIntoView().click()

    // scroll ทั้งหน้าไปตำแหน่งที่กำหนด (pixel)
    cy.scrollTo(0, 500)

    // scroll ไปตำแหน่งที่กำหนดด้วยคำ
    cy.scrollTo('bottom')
    cy.scrollTo('top')
    cy.scrollTo('center')

    // scroll ภายใน container เฉพาะ (เช่น chat box, table)
    cy.get('.scrollable-panel').scrollTo('bottom')
  })
})
