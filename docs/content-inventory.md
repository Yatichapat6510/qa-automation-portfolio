# Content Inventory and Safe Migration Map

This document maps existing work without moving test scripts or changing relative imports.

| Existing location | Classification | Portfolio destination / action |
| --- | --- | --- |
| `Playwright/tests/e2e/` | Active executable suite | Present through `projects/web-playwright.md` |
| `Playwright/tests/practice/` | Learning material | Keep isolated; promote only verified scenarios |
| `cypress/cypress/e2e/1-getting-started/` | Candidate showcase flow | Document and refine as the Cypress featured suite |
| `cypress/cypress/e2e/2-advanced-examples/` | Framework learning material | Retain as supporting practice |
| `Robot-Framework/tests/` and `resources/` | Candidate showcase suites | Add dependency/run documentation, then promote tagged flows |
| `Robot-Framework/sandbox/` and `practice/` | Learning material | Keep out of CI/showcase claims |
| `Workshops/QA-Automation-Workshop/` | Curriculum and multi-tool source material | Retain as learning lab; extract focused projects only after validation |
| `Workshops/Workshop/` | Mixed workshop exercises | Use as source for API, SQL, JMeter, and Appium showcase projects |
| `results/`, `playwright-report/`, `test-results/`, Robot HTML/XML outputs | Generated test evidence | Keep ignored; upload fresh copies through CI artifacts |

## Files intentionally not moved

No script, package file, configuration file, or raw report was moved in this restructuring. Their paths may be used by imports, commands, or workflows. The new documentation layer is designed to be compatible with current execution.

## Future extraction order

1. Keep `Playwright/` as the flagship inside this repository.
2. Create a polished `api-automation-newman` project from the workshop material.
3. Create an `appium-mobile-mini-project` with its own dependencies and device matrix.
4. Create `performance-jmeter-test-lab` only after adding a workload model and analysis.
