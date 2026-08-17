# Playwright Portfolio Test Strategy

## Purpose

Use this document to describe the exact business risks covered by the active Playwright suites. Keep the implementation structure in `PLAYWRIGHT_STRUCTURE.md`; this document is the hiring-manager-facing explanation.

## System under test

- **Demo application:** [describe the deterministic demo application]
- **External demo:** Sauce Demo (`https://www.saucedemo.com`), subject to availability and its published demo behaviour.
- **Browsers:** [confirm the configured browser projects]

## Active test scope

| Area | Current suite location | Risk addressed |
| --- | --- | --- |
| Demo application | `tests/e2e/demo-app/specs/` | [complete with actual scenario] |
| Sauce Demo | `tests/e2e/sauce-demo/specs/` | [complete with actual scenario] |

## Evidence and execution

- Local command: `npm test`
- Project-specific commands: see `../README.md`
- CI workflow: `../../.github/workflows/playwright.yml`
- Failure evidence: [state the configured trace, screenshot, video, and report behaviour after verification]

## Promotion checklist

- [ ] All statements in this document match the checked-in tests.
- [ ] At least one P0 critical path has passed locally and in CI.
- [ ] A scrubbed report screenshot and short GIF are linked from the project README.
- [ ] Credentials are injected through environment variables or GitHub Secrets.
