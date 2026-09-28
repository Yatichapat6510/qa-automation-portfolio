# CI/CD and Docker for QA

**Implementation:** [`.github/workflows/`](../.github/workflows/)

All workflows live at the repository root because GitHub only reads that folder. Each one uses a `paths` filter and `working-directory`, so a change in one project triggers only its own pipeline.

| Workflow | Runs | Evidence produced |
| --- | --- | --- |
| [`playwright.yml`](../.github/workflows/playwright.yml) | Playwright registered suite on Chrome | HTML report artifact (30 days) |
| [`cypress.yml`](../.github/workflows/cypress.yml) | Showcase specs in `1-getting-started/` | Failure screenshots |
| [`robot.yml`](../.github/workflows/robot.yml) | Robot Framework `tests/` under Xvfb | `results/` artifact |
| [`newman.yml`](../.github/workflows/newman.yml) | JSONPlaceholder suite (+ optional authenticated suite) | Newman HTML report |

## Practices in use

- Dependency caching and pinned Node/Python versions.
- Secrets only through GitHub Secrets; non-secret URLs through GitHub Variables.
- `permissions: contents: read` where write access is not needed.
- The optional authenticated API job checks the secret per step, because secrets cannot be used in a job-level `if`.

## Next improvements

1. Add a Dockerfile for one stable suite so it runs with a single `docker compose up`.
2. Publish a scrubbed Playwright report to GitHub Pages and link it from the root README.
3. Add a nightly scheduled run and a summary of pass rate over time.
4. Add a status matrix (browser x suite) once more than one browser is stable.
