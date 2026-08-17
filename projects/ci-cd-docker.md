# CI/CD and Docker for QA

**Current implementation:** [`.github/workflows/playwright.yml`](../.github/workflows/playwright.yml)

The current workflow runs the Playwright suite from its project directory and uploads the Playwright HTML report as an artifact.

## Current workflow evidence

- Triggered by relevant push and pull-request changes.
- Uses dependency caching and a fixed Node version.
- Installs browser dependencies, executes tests, and uploads the report.

## Next improvements

1. Add a smoke workflow for Cypress only after its featured flow is stable.
2. Add API/Newman CI after creating a reviewed collection and safe environment example.
3. Add a Dockerfile only for a suite that you can run locally through Docker.
4. Use GitHub Secrets for credentials and GitHub Variables for non-secret URLs.
5. Keep full reports as artifacts; optionally deploy only scrubbed static evidence to GitHub Pages.
