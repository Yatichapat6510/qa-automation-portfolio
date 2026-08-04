// เขียน test ครบ 3 case แรก: login สำเร็จ, logout กลับหน้า login, refresh แล้วยังอยู่หน้า products

import loginPage from '../pages/LoginPage'

describe('Login Happy Path', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('login สำเร็จด้วย standard_user', () => {
    cy.fixture('login-data').then((d) => {
      loginPage.loginAs(d.validUser.username, d.validUser.password)
    })
    cy.url().should('include', '/inventory.html')
    cy.get('.title').should('contain', 'Products')
    cy.get('.inventory_item').should('have.length', 6)
  })

  it('logout กลับหน้า login', () => {
    cy.login('standard_user', 'secret_sauce')
    cy.logout()
    cy.url().should('eq', 'https://www.saucedemo.com/')
    cy.get('#login-button').should('be.visible')
  })

  it('session ยังคงอยู่หลัง refresh', () => {
    cy.login('standard_user', 'secret_sauce')
    cy.reload()
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_item').should('have.length', 6)
  })
})