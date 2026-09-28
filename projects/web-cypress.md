# Cypress UI Automation

**Implementation:** [`web/cypress/`](../web/cypress/)
**Stack:** Cypress, JavaScript, fixtures, page objects, network/API exercises

## Current evidence

- `cypress/e2e/1-getting-started/project-1-sauce-demo/`: happy path, logout/session, error dismissal and data-driven error cases.
- `cypress/e2e/2-advanced-examples/`: interaction, fixture, API, request, and selector practice.
- `cypress/pages/`: Base, Login, Inventory, and Cart page objects.
- `cypress/fixtures/`: sample users and login data.

## Promotion plan

Feature only one concise business suite first—login, add product, checkout, and logout. Keep framework examples as learning material rather than presenting all of them as production tests.

## CI

[`.github/workflows/cypress.yml`](../.github/workflows/cypress.yml) runs only the showcase specs in `1-getting-started/` on Chrome and uploads failure screenshots. `2-advanced-examples/` is learning material and is not part of CI.

## Next steps

1. Use [`web/cypress/README.md`](../web/cypress/README.md) as the run guide.
2. Add one GIF of the happy-path spec under `assets/gifs/`.
3. Add a data-driven checkout scenario with an explicit business risk in the test strategy.
