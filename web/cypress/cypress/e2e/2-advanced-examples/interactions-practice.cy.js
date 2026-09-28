// เพิ่มสินค้าหลายชนิดแล้วลบออก
describe('Exercise 1: Cart Management', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
  })

  it('เพิ่ม 3 ชิ้น แล้วลบ 1 ชิ้น เหลือ 2 ชิ้น', () => {
    cy.get('.inventory_item').eq(0).find('button').click()
    cy.get('.inventory_item').eq(1).find('button').click()
    cy.get('.inventory_item').eq(2).find('button').click()

    cy.get('.shopping_cart_badge').should('have.text', '3')

    cy.get('.shopping_cart_link').click()
    cy.get('.cart_item').should('have.length', 3)

    cy.get('.cart_item').first().find('button').click()
    cy.get('.cart_item').should('have.length', 2)
  })

  it('sort price high to low แล้วเช็คราคาแรกสูงสุด', () => {
    // ✅ แก้ selector ตรงนี้
    cy.get('.product_sort_container').select('hilo')

    cy.get('.inventory_item_price').first()
      .invoke('text')
      .then((price) => {
        const num = parseFloat(price.replace('$', ''))
        expect(num).to.be.greaterThan(10)
      })
  })
})



// ✅ แยก describe ออกมา ไม่ให้ beforeEach login ก่อน
describe('Keyboard Navigation', () => {
  it('login ด้วย keyboard navigation ล้วนๆ', () => {
    cy.visit('/')
    
    cy.get('#user-name').type('standard_user')
    
    // ✅ ใช้ trigger แทน {tab}
    cy.get('#user-name').trigger('keydown', { keyCode: 9, which: 9 })
    
    cy.get('#password').type('secret_sauce{enter}')
    
    cy.url().should('include', '/inventory.html')
  })
})