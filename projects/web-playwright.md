# Playwright UI Automation

**Implementation:** [`Playwright/`](../Playwright/)
**Stack:** JavaScript, Playwright Test, Page Object Model, custom fixtures, API checks, tracing, GitHub Actions

## Reviewer guide

Start with [`Playwright/README.md`](../Playwright/README.md). The active configuration discovers only deterministic specifications in `tests/e2e/**/specs`. Exercises and drafts live in `tests/practice` and are intentionally excluded from the default run.

## Key evidence

- `tests/e2e/sauce-demo/`: a customer-facing Sauce Demo flow using pages, fixture, data, and critical-path specs.
- `tests/e2e/demo-app/`: deterministic local-style demo and API integration scenarios.
- `configs/`: named Playwright projects and environment settings.
- `.github/workflows/playwright.yml`: CI that installs dependencies, executes the suite, and publishes the report artifact.

## Test intent

| Risk area | Evidence to maintain |
| --- | --- |
| Authentication | valid and invalid access tests |
| Product/cart | add/remove item and cart total checks |
| Checkout | required-field validation and successful completion |
| API/UI integration | response validation and UI behaviour after API interaction |

## Before publishing as the flagship

1. Add one GIF under `assets/gifs/` showing a passing critical path or a Trace Viewer investigation.
2. Add a scrubbed screenshot of the latest report under `assets/images/`.
3. Complete `Playwright/docs/portfolio-test-strategy.md` with the exact system under test and scope.
4. Keep credentials only in GitHub Secrets or local environment variables.
