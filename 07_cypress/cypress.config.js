const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: false,
    defaultCommandTimeout: 6000,
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {},
  },
})
