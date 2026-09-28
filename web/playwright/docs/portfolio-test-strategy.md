# Playwright Test Strategy

## Purpose

Show a maintainable, deterministic browser and API-integration suite that protects the most important customer journeys of an e-commerce style application.

## Systems under test

| System | Type | Notes |
| --- | --- | --- |
| [Sauce Demo](https://www.saucedemo.com/) | Public practice web shop | Base URL overridable through `BASE_URL`. |
| `demo-app` | In-memory application served inside the tests (`app-content/`) plus mocked API routes | Fully deterministic, no external dependency. |

## In scope

- Authentication: accepted users, locked-out user, invalid and missing credentials with exact messages.
- Shopping: add to cart, cart badge, cart contents, checkout with valid customer data.
- Form validation: registration form rules.
- API integration: request/response validation and UI behaviour driven by API results (mocked and against a public API).
- Interaction workflows: dialogs, menus and multi-step interactions.

## Out of scope

- Payment, real order fulfilment and cross-browser visual regression.
- Load and security testing (see `docs/portfolio-roadmap.md`).
- Anything under `tests/practice/`, which is learning material and never runs by default.

## Risk-based priority

| Priority | Scenario | Reason |
| --- | --- | --- |
| P0 | Login with valid user; checkout with valid data | Blocks revenue if broken |
| P0 | Add to cart and cart badge/contents | Core purchase path |
| P1 | Locked-out and invalid login messages | Security and user guidance |
| P1 | Form validation rules | Prevents bad data entering the system |
| P1 | API-driven UI states | Integration risk between UI and backend |
| P2 | Secondary interactions (menus, dialogs) | Lower business impact |

## Approach

- **Structure:** specs in `tests/e2e/<system>/specs`, page objects in `pages/`, data in `data/`, custom fixtures in `fixtures/`. Ownership rules are in [PLAYWRIGHT_STRUCTURE.md](PLAYWRIGHT_STRUCTURE.md).
- **Projects:** `demo-e2e-chromium` and `sauce-demo-chromium` (see `configs/projects.js`).
- **Isolation:** each test starts from a clean state; the authenticated fixture logs in once per test through the page object.
- **Locators:** role/label/test-id based; no positional selectors.
- **Assertions:** web-first assertions with auto-wait; no fixed sleeps.
- **Test data:** kept in `data/`, no production data. Public demo credentials only; secrets would come from environment variables.
- **Failure evidence:** trace on first retry, screenshot and video on failure, HTML report.

## Environments and execution

| Where | Command | Notes |
| --- | --- | --- |
| Local | `npm test` | Headless by default; `npm run test:headed` or `npm run test:ui` for debugging |
| Single project | `npm run test:sauce-demo` / `npm run test:demo` | |
| CI | `.github/workflows/playwright.yml` | Retries: 2, report uploaded as artifact for 30 days |

## Exit criteria

- All registered tests pass in CI on the default branch.
- No `test.only` (enforced by `forbidOnly` in CI).
- Any flaky test is either fixed or quarantined with a linked issue within one iteration.

## Known limitations

- The public Sauce Demo site is a third-party target and may change without notice.
- Only Chrome is registered; Firefox/WebKit projects are a planned addition.
- Test counts and pass rate should be read from the latest CI report, not from this document.
