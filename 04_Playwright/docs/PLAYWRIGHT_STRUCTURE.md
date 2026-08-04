# Playwright Structure

## Project Overview

This repository has one runnable Playwright project: `demo-e2e-chromium`. It runs the deterministic local interaction-workflows demo through a Chromium/Google Chrome channel. The demo is self-contained: a custom fixture intercepts `http://demo.local` and serves in-memory HTML resources.

`tests/practice/` is an intentionally unregistered learning library. Its examples target several unrelated public sites, incomplete exercises, and snippets; it is excluded by the root configuration and is not a production test project. `test-automation/` is a separate, empty scaffold with its own package metadata and a config that currently discovers zero tests.

## Directory Responsibilities

```text
tests/
├── e2e/
│   └── interaction-workflows/       # owner: demo-e2e-chromium
│       ├── interaction-workflows.spec.js
│       ├── fixtures/demo-app.fixture.js
│       ├── resources/demo-pages.resource.js
│       └── data/upload-files.data.js
└── practice/                        # unregistered training examples
    ├── all-practice/
    ├── fundamentals/
    └── sandbox/
```

- `fixtures/` contains Playwright `test.extend()` modules only.
- `app-content/` contains the in-memory HTTP documents served by the feature fixture; it is test-specific, not a shared-resource folder.
- `data/` contains input values and payloads with no fixture or test dependency.
- `practice/` holds examples that are deliberately excluded from normal test execution.
- Root `resources/` contains legacy static HTML learning artifacts. No Playwright source imports them, so they remain in place as `AMBIGUOUS` manual assets rather than being deleted or guessed at.

## Project Ownership

| Owner | Scope | Files |
|---|---|---|
| `demo-e2e-chromium` | PROJECT-SPECIFIC | `tests/e2e/interaction-workflows/**`, root `playwright.config.js` |
| Practice Library | TEST-SPECIFIC / UNREGISTERED | `tests/practice/**` |
| Empty scaffold | AMBIGUOUS | `test-automation/**` |
| Legacy manual assets | AMBIGUOUS / UNUSED BY PLAYWRIGHT | `resources/*.html` |
| Orphaned legacy fixture | AMBIGUOUS / MIXED RESPONSIBILITY | `tests/fixtures/index.js` |

No module is currently `SHARED`: there is only one runnable project. Do not promote a module to shared before it has a second real consumer.

## Test-to-Dependency Mapping

The complete per-file mapping is maintained in [TEST_DEPENDENCY_MAP.md](TEST_DEPENDENCY_MAP.md). The runnable dependency chain is:

```text
BASE_URL (optional)
→ playwright.config.js
→ demo-e2e-chromium
→ demo-app.fixture.js
→ demo-pages.resource.js
→ interaction-workflows.spec.js
   ↘ upload-files.data.js
```

## Fixture Catalog

| Fixture | Source | Scope | Owner | Consumers | Purpose / lifecycle |
|---|---|---|---|---|---|
| `page` override | `tests/e2e/interaction-workflows/fixtures/demo-app.fixture.js` | test | PROJECT-SPECIFIC | `interaction-workflows.spec.js` | Registers a route before `use(page)`; browser/page teardown remains Playwright-managed. No worker, auto, option, auth, API-context, or storage-state fixture exists. |
| `loginPage`, `inventoryPage` (inactive) | `tests/fixtures/index.js` | intended test | AMBIGUOUS / UNREGISTERED | none | Mixed fixture and inline tests. Its referenced `tests/pages/*` modules are absent, so it is neither runnable nor safe to promote or remove without an owner decision. |

The fixture has no circular dependency and opens no unmanaged browser/context/API resource. Its route is attached to Playwright's per-test `page`, so state does not leak between tests.

## Configuration Flow

`BASE_URL` (optional; default is the local demo host) → `playwright.config.js` → `demo-e2e-chromium` (`Desktop Chrome`, `channel: chrome`) → custom `page` fixture → test specification.

The project has no setup project, teardown project, dependencies, auth state, storage state, environment file, global setup, or global teardown. It uses one worker, zero retries locally/two on CI, list plus HTML reporters, first-retry tracing, failure screenshots, and retained failure video.

## Import Rules

- A custom-fixture test imports `test` and `expect` from its fixture entry point.
- A project-specific test cannot import another project's internals.
- Shared code cannot depend on project-specific code.
- Test data cannot import tests or fixtures; page objects cannot import test specifications.
- Keep API clients separate from page objects and move embedded page-object examples into `pages/` only when they become runnable, reused tests.

## Adding a New Test

1. Choose an existing project owner or add an explicit new project in `playwright.config.js` with a non-overlapping `testMatch`.
2. Put a `demo-e2e-chromium` test under `tests/e2e/<feature>/`.
3. Put feature-only fixtures, data, API clients, pages, and schemas under that feature directory; create `shared/` only after a second project consumes a module.
4. Import the custom test fixture when required and keep business assertions in the spec.
5. Add the new mapping entry, run `npx.cmd playwright test --list`, then run the affected project.

## Running Tests

```powershell
npm.cmd test                         # all registered tests
npm.cmd run test:demo                # demo-e2e-chromium only
npx.cmd playwright test --list       # discover registered tests
npx.cmd playwright test --project=demo-e2e-chromium --grep "workflow"
npm.cmd run test:ui
npx.cmd playwright test --debug
npm.cmd run test:report
```

There are no configured tags. Practice examples are not runnable through the root config; register and repair them as a separate project before treating them as a suite.

## Known Exceptions

- `test-automation/playwright.config.ts` declares Chromium and Firefox but has no `test-automation/tests` directory; its list command exits 1 with zero discovered tests. It is retained because external/manual ownership cannot be proven absent.
- `tests/fixtures/index.js` contains an inactive SauceDemo-style fixture and two inline tests, with imports to missing page modules. It is excluded by root `testMatch` and retained unchanged as an ambiguous learning artifact.

## Current Layout Correction (2026-07-24)

The authoritative active layout is `tests/e2e/interaction-workflows/app-content/demo-pages.js` → `fixtures/demo-app.fixture.js` → `interaction-workflows.spec.js`. Any earlier diagram or prose in this document that calls this active module `resources/demo-pages.resource.js` is historical and must not be copied into new tests. `app-content/` is TEST-SPECIFIC; it becomes `shared/` only after a second named Playwright project consumes it.
- `tests/practice/` contains hard-coded public URLs, demo credentials, embedded page objects, test data mixed with logic, and incomplete snippets. It remains excluded to preserve its learning purpose without contaminating the deterministic suite.
- Root `resources/*.html` has no source-code consumer. It remains untouched pending confirmation of its manual owner.
