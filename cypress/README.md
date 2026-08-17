# Cypress Web Automation

**Framework:** Cypress with JavaScript
**System under test:** Sauce Demo (configured in `cypress.config.js`)

## What is in this project

```text
cypress/
├── cypress/e2e/1-getting-started/  # focused project scenarios
├── cypress/e2e/2-advanced-examples/# framework learning exercises
├── cypress/fixtures/               # reusable data inputs
├── cypress/pages/                  # page objects
└── cypress/support/                # support commands and setup
```

## Run locally

```powershell
npm ci
npm run cypress:open
# or
npm run cypress:run
```

## Portfolio scope

The strongest current showcase material is under `1-getting-started/Test Cases — Project 1/`: happy path, data-driven error handling, and form/session behaviour. The `2-advanced-examples/` suite is deliberately retained as learning material.

## Next steps before enabling CI

1. Select and verify one stable end-to-end business flow.
2. Add a small test-strategy document using [`../docs/templates/test-strategy-template.md`](../docs/templates/test-strategy-template.md).
3. Capture CI screenshots on failure and upload them as artifacts.
