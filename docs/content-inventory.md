# Content Inventory and Migration Map

Maps where each piece of work lives after the capability-based restructure and how it may be promoted.

| Location | Classification | Portfolio action |
| --- | --- | --- |
| `web/playwright/tests/e2e/` | Active executable suite (2 projects, 7 specs) | Presented through `projects/web-playwright.md` |
| `web/playwright/tests/practice/` | Learning material | Keep isolated; promote only verified scenarios |
| `web/cypress/cypress/e2e/1-getting-started/project-1-sauce-demo/` | Showcase specs (run in CI) | Add GIF and business-risk note |
| `web/cypress/cypress/e2e/2-advanced-examples/` | Framework learning material | Retain as supporting practice; not in CI |
| `web/robot-framework/tests/` and `resources/` | Tagged suites (`smoke`, `regression`, `integration`) | Promote one UI and one API flow |
| `web/robot-framework/sandbox/`, `practice/`, `e2e-flow/` | Learning / exercise | Keep out of CI and showcase claims |
| `api/postman-newman/` | Runnable API project with CI | Add schema checks and coverage table |
| `mobile/appium/`, `mobile/maestro/` | Foundation (smoke level) | Add login-to-checkout flow |
| `learning/workshops/qa-automation-workshop/` | 8-week curriculum, multi-tool | Retain as learning lab; extract projects after validation |
| `learning/workshops/workshop-1-mixed-exercises/` | Mixed exercises (SQL, JMeter, Postman, Robot, Playwright) | Source for SQL and JMeter showcase projects |
| `learning/workshops/workshop-2-saucedemo/` | Same scenario in Playwright and Python | Reference for POM comparison |
| `docs/internal/` | Working reports from the earlier restructure | Not portfolio content |
| `results/`, `playwright-report/`, `ortoni-report/`, `test-results/` | Generated evidence | Ignored by Git; publish through CI artifacts |

## Restructure summary

| Old path | New path |
| --- | --- |
| `Playwright/` | `web/playwright/` |
| `cypress/` | `web/cypress/` |
| `Robot-Framework/` | `web/robot-framework/` |
| `api-automation/` | `api/postman-newman/` |
| `Appium/`, `Maestro/` | `mobile/appium/`, `mobile/maestro/` |
| `Workshops/` | `learning/workshops/` |
| Workflows inside sub-folders | `.github/workflows/` (root) |

Internal structure of each project was not changed, so relative imports and configuration still resolve.

## Future extraction order

1. Keep `web/playwright/` as the flagship inside this repository.
2. Extract `api/postman-newman/` as a standalone repo if it grows (contract tests, mock server).
3. Build a runnable Appium mini project with its own device matrix.
4. Create a JMeter test lab only after adding a workload model and analysis.
