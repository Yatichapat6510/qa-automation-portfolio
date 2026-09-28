# Cypress Portfolio Test Strategy

## Purpose

Demonstrate login-focused UI automation with data-driven error handling on a public practice shop.

## System under test

[Sauce Demo](https://www.saucedemo.com), configured through `baseUrl` in `cypress.config.js`.

## Featured scope (`e2e/1-getting-started/project-1-sauce-demo/`)

- [x] Valid login with `standard_user` and authenticated session
- [x] Logout returns to the login page
- [x] Session persists after page refresh
- [x] Error message can be dismissed and the form resets
- [x] Data-driven invalid login cases from a fixture
- [ ] Add product to cart (planned)
- [ ] Checkout flow (planned)

## Risk-based priority

| Scenario | Priority | Reason |
| --- | --- | --- |
| Valid login and session | P0 | No access means no purchase |
| Invalid login messages (data-driven) | P1 | Security and user guidance |
| Logout and session persistence | P1 | Account safety |
| Error dismiss / form reset | P2 | Usability |

## Out of scope

`e2e/2-advanced-examples/` is framework learning material and is not run in CI.

## Evidence

- Local command: `npm run cypress:run`
- CI workflow: [`.github/workflows/cypress.yml`](../../../.github/workflows/cypress.yml) (runs the featured specs, uploads failure screenshots)
- Screenshot/video: add a scrubbed GIF under `assets/gifs/`

## Known limitations

Only Chrome is run in CI; cart and checkout coverage is planned.
