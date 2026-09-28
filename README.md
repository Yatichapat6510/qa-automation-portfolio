# QA Automation Portfolio

[![Playwright Tests](https://github.com/Yatichapat6510/qa-automation-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/Yatichapat6510/qa-automation-portfolio/actions/workflows/playwright.yml)
[![Cypress Tests](https://github.com/Yatichapat6510/qa-automation-portfolio/actions/workflows/cypress.yml/badge.svg)](https://github.com/Yatichapat6510/qa-automation-portfolio/actions/workflows/cypress.yml)
[![Robot Framework CI](https://github.com/Yatichapat6510/qa-automation-portfolio/actions/workflows/robot.yml/badge.svg)](https://github.com/Yatichapat6510/qa-automation-portfolio/actions/workflows/robot.yml)
[![Newman API Tests](https://github.com/Yatichapat6510/qa-automation-portfolio/actions/workflows/newman.yml/badge.svg)](https://github.com/Yatichapat6510/qa-automation-portfolio/actions/workflows/newman.yml)

Practical QA and test-automation work across **web UI, API, mobile, performance, database validation and CI/CD**.
Each showcase page explains the quality goal, test approach, evidence and next improvement, not only the tool used.

> 🇹🇭 [อ่านฉบับภาษาไทย](README.th.md)

## About

QA engineer focused on building reliable, maintainable automated checks and communicating quality risk clearly.

**Contact**

- LinkedIn: Yatichapat Kanta (https://www.linkedin.com/in/yatichapat-kanta-8a486b393/)
- E-mail: newtytwenty6510@gmail.com
- GitHub: @Yatichapat6510 · this repository: qa-automation-portfolio

## Where to start (2-minute tour)

1. Read the [Showcase index](projects/README.md) to see every project, its maturity level and its evidence.
2. Open the flagship suite: [`web/playwright`](web/playwright/) (Page Object Model, custom fixtures, API checks, CI report).
3. Read how tests are chosen: [QA strategy](docs/qa-strategy.md) and the [Playwright test strategy](web/playwright/docs/portfolio-test-strategy.md).
4. See how defects are reported: [example bug reports](docs/examples/bug-reports/).

## Projects

| Area | Project | Tools | Status |
| --- | --- | --- | --- |
| Web UI | [`web/playwright`](web/playwright/) | Playwright, JavaScript, POM, fixtures, GitHub Actions | ⭐ Flagship, CI active |
| Web UI | [`web/cypress`](web/cypress/) | Cypress, page objects, fixtures | Showcase spec + CI |
| Web UI / API | [`web/robot-framework`](web/robot-framework/) | Robot Framework, SeleniumLibrary, RequestsLibrary | Tagged suites + CI |
| API | [`api/postman-newman`](api/postman-newman/) | Postman collections, Newman, htmlextra report | CI active |
| Mobile | [`mobile/appium`](mobile/appium/) | Appium 2, Robot Framework AppiumLibrary, Python | Smoke foundation |
| Mobile | [`mobile/maestro`](mobile/maestro/) | Maestro (YAML flows) | Launch-flow foundation |
| Performance | JMeter (see [`projects/performance-jmeter.md`](projects/performance-jmeter.md)) | JMeter | Learning material only |
| Database | SQL validation (see [`projects/sql-data-validation.md`](projects/sql-data-validation.md)) | SQL / SQLite | Learning material only |
| Learning lab | [`learning/workshops`](learning/workshops/) | Multi-tool course exercises | Not presented as a framework |

Status labels are explained in [`projects/README.md`](projects/README.md). Nothing is marked "featured" unless it runs from a clean clone.

## Repository layout

```text
qa-automation-portfolio/
├── web/                     # Browser automation
│   ├── playwright/          # Flagship executable suite
│   ├── cypress/
│   └── robot-framework/
├── api/
│   └── postman-newman/      # Postman collections run with Newman
├── mobile/
│   ├── appium/
│   └── maestro/
├── learning/                # Workshops and exercises (kept separate from showcase work)
├── projects/                # Portfolio-facing showcase pages (one per capability)
├── docs/                    # QA strategy, roadmap, templates, example bug reports
├── assets/                  # Selected GIFs / screenshots used by the docs
└── .github/workflows/       # All CI workflows (GitHub only reads this folder)
```

Why this layout and the promotion rules for learning material: [`PORTFOLIO_STRUCTURE.md`](PORTFOLIO_STRUCTURE.md).

## Run a suite

Each project is self-contained; install and run inside its own folder. The repository root intentionally has no `package.json`.

```bash
# Playwright (Node 20+)
cd web/playwright && npm ci && npx playwright install chrome && npm test

# Cypress
cd web/cypress && npm ci && npm run cypress:run

# Newman API tests
cd api/postman-newman && npm ci && npm test

# Robot Framework (Python 3.11+)
cd web/robot-framework && pip install -r requirements.txt && robot -d results tests/
```

## Engineering practices shown

- Risk-based test selection (P0/P1/P2) and a test pyramid that prefers API/data checks over UI where possible.
- Maintainable structure: Page Object Model, fixtures, shared keywords, separated test data.
- Deterministic tests: no dependence on real third-party data where a local or public stable target exists.
- CI on every relevant change with HTML reports and failure evidence uploaded as artifacts.
- No secrets in the repository: credentials come from GitHub Secrets or local environment variables.

## Roadmap

See [`docs/portfolio-roadmap.md`](docs/portfolio-roadmap.md) for the ordered plan (evidence GIFs, Allure/GitHub Pages report, Docker runner, JMeter analysis, SQL validation project).

## License

[MIT](LICENSE)
