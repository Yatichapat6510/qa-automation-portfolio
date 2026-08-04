// cypress/e2e/login.cy.js

describe('Login Feature - SauceDemo', () => {

  // ======================================
  // รันก่อนทุก test: clear state เสมอ
  // ======================================
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/')   // ใช้ / แทน full URL เพราะ baseUrl ตั้งไว้แล้ว
  })

  // ======================================
  // TEST 1: Login สำเร็จ
  // ======================================
  it('ควร login สำเร็จด้วย credentials ที่ถูกต้อง', () => {

    // --- ARRANGE: เตรียม locator ---
    // (ไม่มีขั้นตอนเตรียมพิเศษ เพราะ beforeEach จัดการแล้ว)

    // --- ACT: กรอก form แล้ว submit ---
    // แก้กลับ
    cy.get('#user-name')
      .should('be.visible')       // ตรวจก่อนว่า field มีอยู่จริง
      .type('standard_user')

    cy.get('#password')
      .type('secret_sauce')

    cy.get('#login-button')
      .click()

    // --- ASSERT: ตรวจผลลัพธ์ ---
    cy.url()
      .should('include', '/inventory.html')  // redirect ถูกต้อง

    cy.get('.inventory_list')
      .should('be.visible')                  // หน้า product แสดงขึ้นมา
  })

  // ======================================
  // TEST 2: Login ด้วย password ผิด
  // ======================================
  it('ควรแสดง error message เมื่อ password ผิด', () => {

    // --- ACT ---
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('wrong_password')
    cy.get('#login-button').click()

    // --- ASSERT ---
    // URL ต้องไม่เปลี่ยน — ยังอยู่หน้า login
    cy.url().should('not.include', '/inventory.html')

    // Error message ต้องแสดง
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match')
  })

  // ======================================
  // TEST 3: Login ด้วย username ว่าง
  // ======================================
  it('ควรแสดง error เมื่อไม่กรอก username', () => {

    // ไม่กรอก username เลย กด login ทันที
    cy.get('#login-button').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username is required')
  })

})
