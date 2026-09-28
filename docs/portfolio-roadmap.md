# Portfolio Roadmap

## Phase 1: make the current portfolio reviewable

1. Record one GIF of the Playwright critical path and one scrubbed report screenshot into `assets/`.
2. Push and confirm all four workflows (Playwright, Cypress, Robot, Newman) are green on the default branch.
3. Set repository description, topics and pin the repository on the GitHub profile.

## Phase 2: promote one project per capability

1. Cypress: one complete Sauce Demo journey with business-risk note.
2. Robot Framework: one UI smoke path and one API test documented as "start here".
3. API: schema/contract checks, negative-case collection, data-driven inputs.
4. SQL: setup, validation and cleanup scripts with synthetic data.

## Phase 3: add differentiators

1. Allure (or similar) report published to GitHub Pages.
2. Docker runner for one stable suite.
3. Mock service or deterministic local API dependency.
4. JMeter report with SLA, workload model, findings and recommendation.
5. Appium Android mini project (login to checkout) and comparable Maestro flows.
6. Accessibility check (axe-core with Playwright) and a short OWASP-style checklist for the demo app.

## Definition of done for every featured project

- README explains value, scope, architecture, setup and run commands.
- No secrets or personal data are committed.
- Tests run locally from a clean clone.
- CI uploads test evidence.
- A reviewer can see one short visual proof and one documented quality decision.
