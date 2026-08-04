describe('Module 3 Assertions', () => {

  // ==========================================
  // Exercise 1: ตรวจสอบ inventory page
  // ==========================================
  describe('Inventory Page', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.get('#user-name').type('standard_user')
      cy.get('#password').type('secret_sauce')
      cy.get('#login-button').click()
    })

    it('ตรวจสอบ inventory page ครบทุก element', () => {
      cy.get('.title').should('be.visible').and('contain', 'Products')
      cy.get('.inventory_item').should('have.length', 6)
      cy.get('.inventory_item_name').each(($name) => {
        expect($name.text()).to.have.length.greaterThan(0)
      })
      // ✅ แก้ selector และ expect
      cy.get('.inventory_item_price').each(($price) => {
        expect($price.text()).to.match(/^\$/)
      })
      cy.get('.shopping_cart_badge').should('not.exist')
    })
  })

  // ==========================================
  // Exercise 2: ตรวจ Error Handling
  // ==========================================
  describe('Error Handling', () => {
    const cases = [
      { user: 'standard_user', pass: 'wrong',  msg: 'Username and password do not match' },
      { user: '',              pass: 'secret', msg: 'Username is required' },
      { user: '',              pass: '',       msg: 'Username is required' },
    ]

    cases.forEach((c) => {
      it(`error: ${c.msg}`, () => {
        cy.visit('/')
        if (c.user) cy.get('#user-name').type(c.user)
        if (c.pass) cy.get('#password').type(c.pass)
        cy.get('#login-button').click()
        cy.get('[data-test="error"]')
          .should('be.visible')
          .and('contain', c.msg)
      })
    })
  })

  // ==========================================
  // Exercise 3: Sort แล้ว Assert ลำดับ
  // ==========================================
  describe('Sort Assertion', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.get('#user-name').type('standard_user')
      cy.get('#password').type('secret_sauce')
      cy.get('#login-button').click()
    })

    it('ราคาเรียงน้อยไปมากหลัง sort', () => {
      cy.get('.product_sort_container').select('lohi')
      cy.get('.inventory_item_price').then(($prices) => {
        const prices = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')))
        const sorted = [...prices].sort((a, b) => a - b)
        expect(prices).to.deep.equal(sorted)
      })
    })
  })

})