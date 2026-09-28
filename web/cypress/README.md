# Cypress Web Automation

**Framework:** Cypress with JavaScript
**System under test:** Sauce Demo (configured in `cypress.config.js`)

## What is in this project

```text
web/cypress/
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

The showcase material is `cypress/e2e/1-getting-started/project-1-sauce-demo/`: happy path, logout, session persistence, error dismissal and data-driven login errors. These specs run in CI. The `2-advanced-examples/` folder is deliberately retained as learning material and is not part of CI.

Run only the showcase specs:

```bash
npx cypress run --spec "cypress/e2e/1-getting-started/**/*.cy.js"
```

## Documentation and CI

- Strategy: [docs/portfolio-test-strategy.md](docs/portfolio-test-strategy.md)
- Workflow: [`.github/workflows/cypress.yml`](../../.github/workflows/cypress.yml)

## Next steps

1. Add cart and checkout specs with page objects (`cypress/pages/`).
2. Add a GIF of the happy path under `assets/gifs/`.
3. Convert the remaining Thai-only comments in specs to bilingual comments if targeting international reviewers.
