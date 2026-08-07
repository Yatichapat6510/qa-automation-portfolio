# Test Dependency Map

## Root Configuration

```text
playwright.config.js
|-- baseURL: https://www.saucedemo.com/
|-- headless: true
|-- demo-e2e-chromium
|   |-- tests/interaction-workflows/interaction-workflows.spec.js
|   `-- five explicitly listed tests/e2e/*.spec.js files
`-- sauce-demo-chromium
    `-- tests/e2e/sauce-demo/tests/**/*.spec.js
```

`tests/practice/**` is excluded and has no named Playwright project. The separate `test-automation/playwright.config.ts` has no discovered tests.

## `sauce-demo-chromium`

### `tests/e2e/sauce-demo/tests/critical-paths.spec.js`

- Test type: deterministic SauceDemo UI E2E; 12 tests.
- Direct imports: `fixtures/app.fixture.js` and `data/credentials.data.js`.
- Fixture: project-specific `page` route plus `loginPage`, `inventoryPage`, `cartPage`, `checkoutPage`, and `authenticatedApp` fixtures.
- Page objects: `pages/login.page.js`, `pages/inventory.page.js`, `pages/cart.page.js`, and `pages/checkout.page.js`.
- Test data: all six accepted usernames, `secret_sauce`, exact login error messages, invalid credentials, and checkout customer data.
- Application content: `app-content/sauce-demo.pages.js`, fulfilled at the configured SauceDemo URL.
- Owner / classification: specification, fixture, and page objects are PROJECT-SPECIFIC; credentials and app content are TEST-SPECIFIC.
- Run command: `npx.cmd playwright test --project=sauce-demo-chromium`.

Dependency flow:

```text
playwright.config.js
-> sauce-demo-chromium
-> fixtures/app.fixture.js
   |-> app-content/sauce-demo.pages.js
   |   `-> data/credentials.data.js
   |-> pages/*.page.js
   `-> data/credentials.data.js
-> tests/critical-paths.spec.js
```

## `demo-e2e-chromium`

### `tests/interaction-workflows/interaction-workflows.spec.js`

- Direct imports: `fixtures/demo-app.fixture.js` and `data/upload-files.data.js`.
- The fixture owns test-scoped routes for `http://demo.local/**` and SauceDemo-compatible pages.
- The spec uses an explicit `http://demo.local` origin where root-path navigation would otherwise resolve against the SauceDemo config base URL.
- Owner / classification: PROJECT-SPECIFIC.

### Registered root E2E specifications

The following files import `test` and `expect` from `tests/interaction-workflows/fixtures/demo-app.fixture.js` and are PROJECT-SPECIFIC to `demo-e2e-chromium`:

- `tests/e2e/E2E api-integration.spec.js`
- `tests/e2e/E2E api-reqres.spec.js`
- `tests/e2e/E2E form-validation.spec.js`
- `tests/e2e/E2E Mini-Project 1.spec.js`
- `tests/e2e/E2E Shopping.spec.js`

`E2E api-integration.spec.js` and `E2E api-reqres.spec.js` add test-local API routes. The form and shopping specifications use pages supplied by the project fixture. Run all consumers with `npx.cmd playwright test --project=demo-e2e-chromium`.

Dependency flow:

```text
playwright.config.js
-> demo-e2e-chromium
-> fixtures/demo-app.fixture.js
   `-> app-content/demo-pages.js
-> registered specifications
   `-> data/upload-files.data.js (interaction workflow only)
```

## Unregistered Legacy Modules

- `tests/practice/**`: TEST-SPECIFIC learning examples with no registered project.
- `tests/fixtures/index.js`: inactive mixed-responsibility fixture/example with unresolved legacy imports.
- `resources/pages/**`: inactive learning page objects; no registered test imports them.

These modules must not be treated as shared dependencies or deleted without direct and indirect usage verification.
