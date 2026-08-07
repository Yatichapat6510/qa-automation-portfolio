# Playwright Structure

## Current Registered Suite (2026-08-06)

The root configuration discovers 53 tests in seven specifications:

| Project | Browser | Tests | Owner / classification |
|---|---|---:|---|
| `demo-e2e-chromium` | system Google Chrome | 41 | `tests/interaction-workflows/**` and the five explicitly listed legacy `tests/e2e/*.spec.js` files; PROJECT-SPECIFIC |
| `sauce-demo-chromium` | system Google Chrome | 12 | `tests/e2e/sauce-demo/**`; PROJECT-SPECIFIC |

`tests/practice/**` remains an intentionally unregistered learning library. It includes selector notes, incomplete snippets, and public-site exercises, so it is excluded by root `testIgnore` rather than skipped dynamically at test runtime.

## Configuration

The authoritative root config is `playwright.config.js`.

- Default `baseURL`: `https://www.saucedemo.com/`.
- Default browser mode: `headless: true`, including VS Code Test Explorer runs.
- `npx.cmd playwright test` runs headless.
- `npx.cmd playwright test --headed` overrides the config and opens the browser.
- `npx.cmd playwright test --ui` opens Playwright UI mode.
- Tests use one worker locally, no local retries, two CI retries, list and HTML reporters, first-retry traces, and failure screenshots.
- `test-automation/playwright.config.ts` is a separate empty scaffold. It uses the same SauceDemo base URL and headless default but currently has no `tests/` directory.

## Project Layout

```text
tests/
|-- e2e/
|   |-- E2E api-integration.spec.js
|   |-- E2E api-reqres.spec.js
|   |-- E2E form-validation.spec.js
|   |-- E2E Mini-Project 1.spec.js
|   |-- E2E Shopping.spec.js
|   `-- sauce-demo/
|       |-- app-content/sauce-demo.pages.js
|       |-- data/credentials.data.js
|       |-- fixtures/app.fixture.js
|       |-- pages/
|       |   |-- cart.page.js
|       |   |-- checkout.page.js
|       |   |-- inventory.page.js
|       |   `-- login.page.js
|       `-- tests/critical-paths.spec.js
|-- interaction-workflows/
|   |-- app-content/demo-pages.js
|   |-- data/upload-files.data.js
|   |-- fixtures/demo-app.fixture.js
|   `-- interaction-workflows.spec.js
`-- practice/                    # TEST-SPECIFIC / UNREGISTERED
```

## Responsibilities and Ownership

- `tests/e2e/sauce-demo/**` belongs only to `sauce-demo-chromium`. Its fixture and page objects are PROJECT-SPECIFIC. Its credentials and in-memory application content are TEST-SPECIFIC.
- `tests/interaction-workflows/**` and the five root E2E specs explicitly registered in the config belong to `demo-e2e-chromium`.
- No module is classified as SHARED because no module has two project consumers.
- A test using a custom fixture imports both `test` and `expect` from that fixture entry point.
- Test data imports no tests or fixtures. Page objects import no specifications.
- Root `resources/` and `tests/fixtures/index.js` remain unregistered legacy learning artifacts; they are not dependencies of either registered project.

## Deterministic Application Fixtures

Both registered projects use deterministic in-memory HTML rather than depending on external network availability.

- `demo-app.fixture.js` fulfills `http://demo.local/**` for interaction examples and SauceDemo-compatible routes at `https://www.saucedemo.com/**` for the older shopping examples. The config base URL remains SauceDemo; the two demo tests that require the root demo page navigate explicitly to `http://demo.local`.
- `sauce-demo/fixtures/app.fixture.js` fulfills `https://www.saucedemo.com/**` with a project-owned SauceDemo-compatible application. It covers all six accepted usernames, the common password, exact login errors, inventory, cart, and checkout.

This routing keeps the URL and locators aligned with SauceDemo while making the registered suite repeatable offline.

## Adding or Changing Tests

1. Assign the test to one named project, or document why it remains an unregistered practice example.
2. Put project-only fixtures, pages, data, and application content under that project's responsibility-specific directory.
3. Do not import another project's internals.
4. After a structural change, run `npx.cmd playwright test --list`.
5. Run every changed test and affected project before handoff.

## Run Commands

```powershell
npx.cmd playwright test --list
npx.cmd playwright test
npx.cmd playwright test --project=demo-e2e-chromium
npx.cmd playwright test --project=sauce-demo-chromium
npx.cmd playwright test --headed
npx.cmd playwright test --ui
```
