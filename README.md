# QA Automation Portfolio

[![Playwright Tests](https://github.com/Yatichapat6510/qa-automation-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/Yatichapat6510/qa-automation-portfolio/actions/workflows/playwright.yml)

Portfolio of practical QA and Test Automation work across web UI, API, mobile, performance, database validation, and CI/CD. Each showcase page explains the quality goal, test approach, evidence, and next enhancement—not only the tool used.

> **Portfolio navigation:** start with the [Showcase index](projects/README.md), then open a project README to see its runnable suite and supporting documentation.

## Featured projects

| Focus | Current implementation | What it demonstrates |
| --- | --- | --- |
| [Playwright UI Automation](projects/web-playwright.md) | [`Playwright/`](Playwright/) | JavaScript, POM, fixtures, tracing, API checks, GitHub Actions |
| [Cypress UI Automation](projects/web-cypress.md) | [`cypress/`](cypress/) | UI workflows, fixtures, page objects, network/API exercises |
| [Robot Framework](projects/robot-framework.md) | [`Robot-Framework/`](Robot-Framework/) | keyword-driven web UI and API automation |
| [API Automation](projects/api-automation.md) | [`Workshops/`](Workshops/) | Postman collection and Python API tests; Newman is the planned CI extension |
| [Performance Testing](projects/performance-jmeter.md) | [`Workshops/`](Workshops/) | JMeter learning plan and load-test artefacts |
| [Mobile Automation](projects/mobile-appium.md) | [`Workshops/`](Workshops/) | Appium foundations and mobile test-suite roadmap |

## Repository map

```text
Playwright/          # Active, runnable Playwright suites plus isolated practice material
cypress/             # Cypress UI automation project
Robot-Framework/     # Robot Framework UI/API suites
Workshops/            # Learning lab and source material, intentionally kept separate from showcase suites
projects/            # Hiring-manager-friendly project pages and evidence checklist
docs/                # QA strategy, templates, portfolio roadmap, and content inventory
assets/              # Curated GIFs and screenshots for README files (not raw CI output)
```

## Quick start

The root is a portfolio hub and has no shared package manager configuration. Run a suite from its own directory:

```powershell
cd Playwright
npm ci
npx playwright install
npm test
```

See the individual project README for exact prerequisites and commands.

## Quality approach

- Test the highest-risk customer journeys first: authentication, product/cart behaviour, checkout, and API validation.
- Keep executable suites separate from practice material so CI remains deterministic.
- Store credentials in environment variables or GitHub Secrets; never commit `.env` files.
- Upload raw reports, traces, screenshots, and logs as CI artifacts. Add only a small, scrubbed selection to `assets/` for portfolio presentation.
- Use AI to draft ideas or test data only after human review; see [AI-assisted testing guidance](docs/ai-assisted-testing.md).

## Documentation

- [Portfolio roadmap](docs/portfolio-roadmap.md)
- [QA strategy](docs/qa-strategy.md)
- [Content inventory and migration map](docs/content-inventory.md)
- [Documentation templates](docs/templates/README.md)

## Contact

**Yatichapat** — QA / Test Automation Engineer candidate
Add LinkedIn, email, and resume links here before publishing.
