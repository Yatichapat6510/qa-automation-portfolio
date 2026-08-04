// Exercise 1: หา element บนหน้า Login (ง่าย)

describe('Exercise 1: Login Page Selectors', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('หา username field ด้วย 3 วิธีต่างกัน', () => {
    // วิธีที่ 1: by id
    cy.get('#user-name').should('exist')

    // วิธีที่ 2: by attribute
    cy.get('[placeholder="Username"]').should('exist')

    // วิธีที่ 3: by type + name
    cy.get('input[name="user-name"]').should('exist')
  })

  it('หา login button ด้วย 2 วิธี', () => {
    // วิธีที่ 1: by id
    cy.get('#login-button').should('exist')

    // วิธีที่ 2: by value attribute
    cy.get('[data-test="login-button"]').should('exist')
  })
})


// Exercise 2: หา element บนหน้า Products (ปานกลาง)

describe('Exercise 2: Inventory Page Selectors', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
  })

  it('นับจำนวน product ที่แสดง', () => {
    cy.get('.inventory_item')
      .should('have.length', 6)    // SauceDemo มี 6 สินค้า
  })

  it('หาสินค้าชิ้นแรกและคลิก Add to cart', () => {
    cy.get('.inventory_item')
      .first()
      .find('button')
      .should('contain', 'Add to cart')
      .click()

    // ตรวจว่า cart badge แสดงเลข 1
    cy.get('.shopping_cart_badge').should('contain', '1')
  })

  it('หาสินค้าจากชื่อ แล้วคลิก', () => {
    // หาสินค้าจากชื่อ
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack')
      .click()

    // ตรวจว่า URL เปลี่ยนไปหน้า detail
    cy.url().should('include', 'inventory-item')
  })

  it('หา sort dropdown แล้วเปลี่ยนค่า', () => {
    cy.get('[data-test="product-sort-container"]')
      .should('be.visible')
      .select('za')    // เรียง Z-A

    // ตรวจว่าสินค้าแรกเปลี่ยนไป
    cy.get('.inventory_item_name')
      .first()
      .should('contain', 'Test.allTheThings()')
  })
})


// Exercise 3: Selector Challenge (ยาก)

describe('Exercise 3: Selector Challenge', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
  })

  it('หา price ของสินค้าชิ้นแรก', () => {
    cy.get('.inventory_item')
      .first()
      .find('.inventory_item_price')
      .should('be.visible')
      // ตรวจว่าขึ้นต้นด้วย $
      .invoke('text')
      .should('match', /^\$/)
  })

  it('เพิ่มสินค้า 2 ชิ้น ตรวจ cart badge', () => {
    // เพิ่มสินค้าชิ้นที่ 1
    cy.get('.inventory_item').eq(0).find('button').click()
    // เพิ่มสินค้าชิ้นที่ 2
    cy.get('.inventory_item').eq(1).find('button').click()

    // cart badge ต้องแสดง 2
    cy.get('.shopping_cart_badge')
      .should('have.text', '2')
  })

  it('คลิก hamburger menu แล้วหา logout link', () => {
    // เปิด menu
    cy.get('#react-burger-menu-btn').click()

    // รอ menu เปิด แล้วหา logout
    cy.get('[data-test="logout-sidebar-link"]')
      .should('be.visible')
      .click()

    // กลับมาหน้า login
    cy.url().should('eq', 'https://www.saucedemo.com/')
  })
})



