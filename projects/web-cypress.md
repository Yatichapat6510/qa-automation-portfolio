# Cypress UI Automation

**Implementation:** [`cypress/`](../cypress/)
**Stack:** Cypress, JavaScript, fixtures, page objects, network/API exercises

## Current evidence

- `cypress/e2e/1-getting-started/`: focused Sauce Demo workflow and data-driven error cases.
- `cypress/e2e/2-advanced-examples/`: interaction, fixture, API, request, and selector practice.
- `cypress/pages/`: Base, Login, Inventory, and Cart page objects.
- `cypress/fixtures/`: sample users and login data.

## Promotion plan

Feature only one concise business suite first—login, add product, checkout, and logout. Keep framework examples as learning material rather than presenting all of them as production tests.

## Next steps

1. Use [`cypress/README.md`](../cypress/README.md) as the run guide.
2. Add a GitHub Actions workflow after the featured suite runs reliably locally.
3. Capture screenshots on failure and upload them from CI.
