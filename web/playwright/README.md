# Playwright Quality Engineering Project

Flagship suite of the portfolio: deterministic end-to-end and API-integration tests with Page Object Model, custom fixtures, tracing and CI reporting.

- Strategy and scope: [docs/portfolio-test-strategy.md](docs/portfolio-test-strategy.md)
- Folder rules and ownership: [docs/PLAYWRIGHT_STRUCTURE.md](docs/PLAYWRIGHT_STRUCTURE.md)
- CI: [`.github/workflows/playwright.yml`](../../.github/workflows/playwright.yml) at the repository root

## What is covered

| Project | Target | Focus |
| --- | --- | --- |
| `sauce-demo-chromium` | https://www.saucedemo.com | Authentication (accepted, locked-out, invalid, missing credentials) and shopping critical path |
| `demo-e2e-chromium` | In-memory demo app + mocked/public API | Form validation, API integration, interaction workflows, shopping flow |

The default configuration discovers only `tests/e2e/**/specs/*.spec.*`. Everything under `tests/practice/` is learning material and never runs by default.

## Setup

Requires Node.js 20+ and Google Chrome.

```bash
npm ci
npx playwright install chrome
```

## Run

```bash
npm test                 # all registered projects, headless
npm run test:list        # list discovered tests without running
npm run test:sauce-demo  # Sauce Demo project only
npm run test:demo        # demo-app project only
npm run test:headed      # watch the browser
npm run test:ui          # Playwright UI mode
npm run test:report      # open the last HTML report
```

Override the target with an environment variable: `BASE_URL=https://staging.example.com npm test`.

## Layout

```text
web/playwright/
├── configs/            # environment and named Playwright projects
├── tests/
│   ├── e2e/            # executable, deterministic suite
│   │   ├── demo-app/   #   specs, data, fixtures, app-content
│   │   └── sauce-demo/ #   specs, pages, data, fixtures
│   └── practice/       # learning material (excluded from discovery)
├── utils/              # shared helpers
└── docs/               # strategy, structure and migration notes
```

## Reports and evidence

HTML report: `playwright-report/`. Ortoni report: `reports/ortoni-report/`. Traces are captured on first retry, screenshots and video on failure. Generated folders are ignored by Git; CI uploads the HTML report as an artifact.

## Conventions

- Files: `kebab-case`, English names. Specs end in `.spec.js`.
- Selectors: roles, labels and test ids; no fixed sleeps.
- No secrets in the repository; use environment variables or GitHub Secrets.
