describe('Click Interactions', () => {
  // ⚠️ ไฟล์นี้เป็น syntax reference สาธิตการใช้คำสั่ง Cypress เท่านั้น
  // selector (#login-button ที่ไม่ได้ login ก่อน, .slider, .canvas, #username, #search ฯลฯ)
  // เป็นของสมมติ ไม่มีอยู่จริงบนหน้าใดของ SauceDemo และไฟล์นี้ไม่มี cy.visit()
  // จึง .skip() ไว้ทั้งหมดเพื่อไม่ให้ fail ใน CI — ถ้าจะให้รันจริงต้องเขียนใหม่ให้ตรงกับ UI จริง

  it.skip('คลิกพื้นฐาน / คลิกหลาย element / force click', () => {
    //คลิกพื้นฐาน
    cy.get('#login-button').click()

    //คลิกหลาย element พร้อมกัน - ต้องใส่ multiple: true
    cy.get('.checkbox').click({ multiple: true })

    //คลิกแบบไม่สน actionability check (ใช้ระวัง!)
    cy.get('.hidden-btn').click({ force: true })
  })

  it.skip('คลิกตามตำแหน่ง (position) บน element', () => {
    cy.get('.slider').click('topLeft')
    cy.get('.slider').click('top')
    cy.get('.slider').click('topRight')
    cy.get('.slider').click('left')
    cy.get('.slider').click('center')  // default
    cy.get('.slider').click('right')
    cy.get('.slider').click('bottomLeft')
    cy.get('.slider').click('bottom')
    cy.get('.slider').click('bottomRight')

    // หรือระบุ x, y coordinate เอง (pixel จากมุมซ้ายบนของ element)
    cy.get('.canvas').click(100, 50)
  })

  it.skip('ดับเบิลคลิก และคลิกขวา', () => {
    // ดับเบิลคลิก
    cy.get('.editable-cell').dblclick()

    // คลิกขวา (เปิด context menu)
    cy.get('.file-item').rightclick()
  })

  it.skip('คลิกพร้อม modifier key (ctrl, shift, meta, alt)', () => {
    cy.get('.item').click({ ctrlKey: true })
    cy.get('.item').click({ shiftKey: true })
    cy.get('.item').click({ metaKey: true })   // Cmd บน Mac
    cy.get('.item').click({ altKey: true })
  })

  it.skip('พิมพ์ข้อความพื้นฐาน และล้างข้อความเดิมก่อนพิมพ์ใหม่', () => {
    cy.get('#username').type('standard_user')

    // ลบข้อความเดิมก่อนพิมพ์ใหม่ (สำคัญมาก!)
    cy.get('#username').clear().type('new_user')

    // หรือใช้ {selectall} แล้วพิมพ์ทับ
    cy.get('#username').type('{selectall}new_user')
  })

  it.skip('พิมพ์แล้วกด Enter / backspace / selectall', () => {
    // พิมพ์แล้วกด Enter เพื่อ submit
    cy.get('#search').type('cypress testing{enter}')

    // พิมพ์ผิดแล้วลบด้วย backspace
    cy.get('#input').type('helloo{backspace}')
    // ผลลัพธ์: "hello" (ลบตัว o ตัวสุดท้ายออก)

    // เลือกทั้งหมดแล้วพิมพ์ทับ
    cy.get('#input').type('{selectall}{backspace}')
    // ผลลัพธ์: field ว่างเปล่า
  })

  it.skip('พิมพ์แบบช้าๆ (delay) และพิมพ์แบบ force', () => {
    // พิมพ์ทีละตัวช้าๆ (จำลอง user จริง) — debug timing issue
    cy.get('#input').type('slow typing', { delay: 100 })

    // พิมพ์โดยไม่ trigger event ปกติ (ใช้ในกรณีพิเศษ)
    cy.get('#input').type('text', { force: true })
  })

  it.skip('เลือก option ใน dropdown (select)', () => {
    // HTML: <select data-test="product-sort-container">
    //   <option value="az">Name (A to Z)</option>
    //   <option value="za">Name (Z to A)</option>
    //   <option value="lohi">Price (low to high)</option>
    // </select>

    // เลือกด้วย value attribute
    cy.get('[data-test="product-sort-container"]').select('za')

    // เลือกด้วย visible text
    cy.get('[data-test="product-sort-container"]').select('Price (low to high)')

    // เลือกด้วย index (เริ่มนับจาก 0)
    cy.get('[data-test="product-sort-container"]').select(2)

    // เลือกหลาย option พร้อมกัน (ส่งเป็น array)
    cy.get('select[multiple]').select(['option1', 'option3'])

    cy.get('[data-test="product-sort-container"]')
      .select('za')
      .should('have.value', 'za')
  })

  it.skip('ติ๊ก checkbox / radio', () => {
    // ติ๊กถูก (ถ้าติ๊กอยู่แล้ว จะไม่ทำอะไร ไม่ toggle)
    cy.get('#agree-terms').check()

    // ยกเลิกติ๊ก
    cy.get('#agree-terms').uncheck()

    // ติ๊กหลาย checkbox พร้อมกัน — ส่ง value array
    cy.get('input[type="checkbox"]').check(['option1', 'option3'])

    // HTML: <input type="radio" name="payment" value="credit">
    cy.get('input[name="payment"]').check('credit')

    // หรือเจาะจง element ตรงๆ
    cy.get('#payment-credit').check()

    cy.get('#agree-terms').check().should('be.checked')
    cy.get('#agree-terms').uncheck().should('not.be.checked')
  })
})
