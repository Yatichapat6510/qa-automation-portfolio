# Playwright Structure Report

> **2026-07-24 review addendum — authoritative current state:** This addendum supersedes earlier path references in this historical report. The live active dependency is `fixtures/demo-app.fixture.js` → `app-content/demo-pages.js`; no active feature directory is named `resources` or `support`.

## Review Addendum: Completed Safe Migration

### Observed baseline and scope

- Runtime baseline: Node `v24.15.0`, npm `11.12.1`.
- Root discovery baseline: exit `0`; 7 tests in 1 file under project `demo-e2e-chromium`.
- Source inventory: 30 JavaScript/TypeScript files beneath `tests/`; 26 `*.spec.*`-named files; 23 files contain `test()` calls. Only the active E2E specification is registered by the root config.
- Configuration inventory: root `playwright.config.js` (active, one project); `test-automation/playwright.config.ts` (two declared browser projects but zero tests).
- Environment reads: `BASE_URL` and `CI` only. No `.env`, storage state, auth setup, global setup, global teardown, API client, schema module, reporter module, or shared module was found.

### Classification and ownership corrections

| Item | Classification | Owner / consumer evidence |
|---|---|---|
| `tests/e2e/interaction-workflows/interaction-workflows.spec.js` | Test specification, PROJECT-SPECIFIC | `demo-e2e-chromium`; selected by `e2e/**/*.spec.js` |
| `fixtures/demo-app.fixture.js` | Project-specific base fixture | one active spec; extends Playwright `page` at test scope |
| `app-content/demo-pages.js` | TEST-SPECIFIC application content | one direct fixture import; provides routed HTML documents |
| `data/upload-files.data.js` | TEST-SPECIFIC test data | one direct active-spec import |
| `tests/practice/**` (25 files) | TEST-SPECIFIC / UNREGISTERED practice material | excluded by root config; several files have mixed responsibility or incomplete test bodies |
| `tests/fixtures/index.js` | AMBIGUOUS / MIXED RESPONSIBILITY | inactive fixture plus inline tests; imports two missing page objects |
| `resources/*.html` and `resources/Solition/PAGES/**` | AMBIGUOUS legacy manual assets | no source-code import; retained without deletion or relocation |
| `test-automation/**` | AMBIGUOUS separate scaffold | nested config lists zero tests |

There are no verified shared modules because there is one runnable project. No active cross-project dependency or circular dependency was found. The legacy fixture's missing imports are a broken inactive dependency, not an active-suite import failure.

### Migration plan and implementation

The pre-change plan is recorded in `docs/STRUCTURE_MIGRATION_PLAN.md`. One low-risk migration was completed after confirming its single direct consumer:

| Current Path | Final Path | Imports updated | Result |
|---|---|---|---|
| `tests/e2e/interaction-workflows/resources/demo-pages.resource.js` | `tests/e2e/interaction-workflows/app-content/demo-pages.js` | `fixtures/demo-app.fixture.js` | completed |

No assertions, test titles, test data, credentials, fixture behaviour, project selection, or business logic changed. No file was deleted.

### Final structure

```text
11_Playwright/
├── playwright.config.js                     # active runner config
├── docs/
│   ├── PLAYWRIGHT_STRUCTURE.md
│   ├── TEST_DEPENDENCY_MAP.md
│   └── STRUCTURE_MIGRATION_PLAN.md
├── tests/
│   ├── e2e/interaction-workflows/           # owner: demo-e2e-chromium
│   │   ├── interaction-workflows.spec.js
│   │   ├── fixtures/demo-app.fixture.js
│   │   ├── app-content/demo-pages.js
│   │   └── data/upload-files.data.js
│   ├── fixtures/index.js                     # inactive ambiguous legacy artifact
│   └── practice/                             # unregistered learning library
├── resources/                                # ambiguous legacy manual assets
└── test-automation/                          # empty separate scaffold
```

### Validation results for this review

| Command | Purpose | Exit code | Actual result |
|---|---|---:|---|
| `node --check` on four active modules | syntax validation after import update | 0 | passed |
| `npx.cmd playwright test --list` | root discovery after migration | 0 | 7 tests in 1 file listed |
| `npx.cmd playwright test --project=demo-e2e-chromium` | affected project execution | 1 | BLOCKED: Playwright cannot find `ffmpeg-win64.exe`; 7 attempts stopped before test logic |
| `npx.cmd playwright test --list --config=test-automation/playwright.config.ts` | nested scaffold audit | 1 | 0 tests found |

The project result is **BLOCKED**, not a test assertion failure. Repair the Playwright media prerequisite with `npx.cmd playwright install ffmpeg`, then rerun `npx.cmd playwright test --project=demo-e2e-chromium`.

### Remaining risks and decisions needed

1. An owner must decide whether to repair, split, or retire the unregistered practice artifacts and `tests/fixtures/index.js`; this review deliberately preserved them.
2. An owner must confirm whether the root legacy HTML/POM assets and `test-automation` scaffold are manual material to retain.
3. The active suite has not completed browser execution in this environment because the ffmpeg prerequisite is missing.

## 1. Executive Summary

The runnable suite originally mixed its test with generic `support` and `fixtures` folders while a larger set of unrelated learning specs lived beside it. The review isolated the runnable demo feature, gave its only runner project a descriptive name, and placed its fixture, resource, and data under the same feature owner. Twenty-five learning files were grouped under an explicitly excluded Practice Library. No test, assertion, or source file was deleted.

One runnable project is now unambiguous. Static validation and test discovery pass. Browser execution remains **BLOCKED** by a missing Playwright ffmpeg binary; this is an environment prerequisite, not an assertion failure.

## 2. Original Structure

```text
11_Playwright/
├── playwright.config.js
├── package.json
├── resources/                         # five standalone HTML files
├── test-automation/                   # separate empty scaffold
└── tests/
    ├── All Practice/
    ├── Start Practice/
    ├── sandbox/
    ├── e2e/interaction-workflows.spec.js
    ├── fixtures/{demo-pages.js, upload-files.js}
    └── support/test.js
```

Generated directories (`node_modules`, `playwright-report`, `test-results`) and Git metadata are omitted.

## 3. Detected Playwright Projects

| Location | Project | Test selection | Browser / base URL | Setup/auth/state | Reporter / execution | Status |
|---|---|---|---|---|---|---|
| Root `playwright.config.js` | `demo-e2e-chromium` | `tests/e2e/**/*.spec.js`; ignores `practice/**` | Desktop Chrome channel; `BASE_URL` or local demo host | No dependency/setup/teardown/auth/storage state | list + HTML, 1 worker, retry 0 local/2 CI | 7 tests discovered |
| `test-automation/playwright.config.ts` | `chromium`, `firefox` | `test-automation/tests` | Desktop Chrome / Firefox; public demo URL | No dependency/setup/teardown/auth/storage state | list + HTML, retry 1 | 0 tests; list exits 1 |

The root project has no overlapping `testMatch`, no duplicated name, no indirect config owner, and no storage-state misuse. The nested scaffold config is retained as `AMBIGUOUS` because it has no discovered tests and no verified consumer.

Root run command: `npx.cmd playwright test --project=demo-e2e-chromium`. CI runs `npm ci`, installs Playwright dependencies, then runs the root suite.

## 4. File Classification

| Classification | Files / count | Notes |
|---|---:|---|
| Playwright configuration | 2 | Root active config; nested empty-scaffold config |
| Test specification | 22 runnable-shaped specs | 1 active, 21 unregistered practice specs |
| Obsolete/incomplete specification | 4 | Four practice `.spec.js` files have no import or `test()` call |
| Project-specific fixture | 1 | `demo-app.fixture.js` |
| Project-specific resource | 1 | `demo-pages.resource.js` |
| Project-specific test data | 1 | `upload-files.data.js` |
| Embedded page object | 2 | `set4-pom.spec.js`, `Exercise Sets.spec.js`; mixed responsibility |
| Embedded API/schema logic | 4 | sandbox/API-mocking examples; mixed responsibility |
| Environment configuration | 0 | only optional `BASE_URL` read by root config; no `.env` file |
| Auth / global setup / teardown / storage state | 0 | none detected |
| CI configuration | 1 | `.github/workflows/playwright.yml` |
| Generated file | 2 directories | `playwright-report/`, `test-results/` (not reviewed as source) |
| Ambiguous manual asset | 5 | root `resources/*.html`, no source-code import |

No standalone page object, component object, API client, helper, utility, constant, schema, reporter module, shared fixture, or support module currently exists.

## 5. Test Dependency Matrix

| Test File | Playwright Project | Config | Fixture | Resource | Support | Page Object | Test Data | Auth/Setup | Shared Dependencies |
|---|---|---|---|---|---|---|---|---|---|
| `tests/e2e/interaction-workflows/interaction-workflows.spec.js` | `demo-e2e-chromium` | root | `demo-app.fixture.js` | `demo-pages.resource.js` | none | none | `upload-files.data.js` | none | `@playwright/test` |
| `tests/practice/all-practice/*.spec.js` | UNREGISTERED | root ignores | none | none | none | inline in none | inline in `reading` | none | `@playwright/test` where imported |
| `tests/practice/fundamentals/*.spec.js` | UNREGISTERED | root ignores | none | none | none | inline `CheckoutPage` in set4 | inline upload values | none | `@playwright/test` |
| `tests/practice/sandbox/*.spec.*` | UNREGISTERED | root ignores | none | external public sites/APIs | inline route code | inline `CheckoutPage` in Exercise Sets | inline | none | `@playwright/test`, Ajv in API test |

The complete per-file map, including direct and indirect dependencies and run commands, is in `docs/TEST_DEPENDENCY_MAP.md`.

## 6. Fixture Analysis

`demo-app.fixture.js` is the only fixture. It extends the base `test` with a test-scoped, manual `page` override. It depends on `demo-pages.resource.js`, registers a route before yielding the page, and relies on Playwright for browser/context/page teardown. It owns no API context or authentication and has no auto, worker, or option fixtures. The test uses the correct custom-fixture import. No circular fixture dependency or state/data leakage was detected.

## 7. Resource and Support Analysis

| Previous path | New path / classification | Consumers | Owner |
|---|---|---|---|
| `tests/support/test.js` | `tests/e2e/interaction-workflows/fixtures/demo-app.fixture.js` / fixture | active E2E spec | PROJECT-SPECIFIC |
| `tests/fixtures/demo-pages.js` | `tests/e2e/interaction-workflows/resources/demo-pages.resource.js` / resource | fixture → active spec | PROJECT-SPECIFIC |
| `tests/fixtures/upload-files.js` | `tests/e2e/interaction-workflows/data/upload-files.data.js` / test data | active E2E spec | PROJECT-SPECIFIC |
| `resources/*.html` | unchanged / ambiguous manual assets | no source consumer | AMBIGUOUS |

The broad `support` folder is eliminated from runnable code. No generic `resources` or `support` directory remains inside the active project.

## 8. Structural Problems Found

| Severity | Finding | Resolution / status |
|---|---|---|
| High | Browser execution lacks required ffmpeg | BLOCKED; Playwright reports missing binary even after an install command returned exit 0 |
| Medium | Active feature dependencies were scattered across generic folders | fixed by feature-local fixture/resource/data placement |
| Medium | Root project name was browser-only and did not state ownership | fixed: `demo-e2e-chromium` |
| Medium | Practice files were mixed with active test directories | fixed: grouped under ignored `tests/practice/` |
| Medium | Nested config discovers no tests | retained as ambiguous; needs owner decision |
| Medium | Four `.spec.js` files contain no test/import | retained as incomplete practice material |
| Low | Some practice specs combine test logic with data, API logic, schemas, or page objects | documented; do not register until split |
| Low | Practice specs contain hard-coded public URLs and demo credentials | documented without values; leave unchanged to preserve teaching examples |
| Low | Root HTML assets have no code consumer | retained pending manual-owner confirmation |

No broken active import, active circular dependency, active duplicate fixture, overlapping active project selection, environment-name conflict, config hard-code duplication, or cross-project import was detected.

## 9. Migration Performed

| Current Path | Proposed Path | Classification | Owner | Reason | Imports Affected | Risk |
|---|---|---|---|---|---|---|
| `tests/e2e/interaction-workflows.spec.js` | `tests/e2e/interaction-workflows/interaction-workflows.spec.js` | Test Specification | demo E2E | colocate its owned dependencies | 2 relative imports | Low |
| `tests/support/test.js` | `tests/e2e/interaction-workflows/fixtures/demo-app.fixture.js` | Project Fixture | demo E2E | fixture, not generic support | spec + resource import | Low |
| `tests/fixtures/demo-pages.js` | `tests/e2e/interaction-workflows/resources/demo-pages.resource.js` | Resource | demo E2E | served in-memory resource | fixture import | Low |
| `tests/fixtures/upload-files.js` | `tests/e2e/interaction-workflows/data/upload-files.data.js` | Test Data | demo E2E | data-only payload module | spec import | Low |
| `tests/All Practice` | `tests/practice/all-practice` | Practice Library | unregistered | isolate ignored examples | none | Low |
| `tests/Start Practice` | `tests/practice/fundamentals` | Practice Library | unregistered | descriptive category | none | Low |
| `tests/sandbox` | `tests/practice/sandbox` | Practice Library | unregistered | explicit unregistered owner | none | Low |

Migration order completed: safe rename/move → import update → config isolation → documentation. Fixture consolidation, shared extraction, and removal were intentionally not performed because only one real fixture exists and no unused source was proven safe to delete.

## 10. Files Modified

- `playwright.config.js`: explicit active selection, practice ignore rule, descriptive project name.
- `package.json`: `test:demo` now selects the named project.
- Active E2E spec and fixture imports: updated after relocation.
- Active resource/data: comments clarify their feature-local ownership.

## 11. Files Created

- `AGENTS.md`: durable repository guardrails.
- `docs/PLAYWRIGHT_STRUCTURE.md`: ownership, configuration, and maintenance guide.
- `docs/TEST_DEPENDENCY_MAP.md`: every test file's dependency mapping.
- `PLAYWRIGHT_STRUCTURE_REPORT.md`: this review and validation evidence.

## 12. Files Not Moved

- `resources/*.html`: no code import does not prove that a learner/manual workflow does not use them.
- `test-automation/**`: it is a separate scaffold with no discovered tests; do not delete until its owner confirms it is obsolete.
- Practice files with embedded POM/API/schema/data: kept intact to preserve original learning behavior; extraction would be a business/teaching-content change.

## 13. Final Structure

```text
11_Playwright/
├── AGENTS.md
├── PLAYWRIGHT_STRUCTURE_REPORT.md
├── docs/
│   ├── PLAYWRIGHT_STRUCTURE.md
│   └── TEST_DEPENDENCY_MAP.md
├── playwright.config.js
├── resources/                         # ambiguous manual HTML assets
├── test-automation/                   # empty, separate scaffold
└── tests/
    ├── e2e/interaction-workflows/
    │   ├── interaction-workflows.spec.js
    │   ├── fixtures/demo-app.fixture.js
    │   ├── resources/demo-pages.resource.js
    │   └── data/upload-files.data.js
    └── practice/
        ├── all-practice/
        ├── fundamentals/
        └── sandbox/
```

## 14. Validation Results

| Command | Purpose | Exit code | Result |
|---|---|---:|---|
| `node --version` | baseline runtime | 0 | Node `v24.15.0` |
| `npm.cmd --version` | baseline package manager | 0 | npm `11.12.1` |
| `npx.cmd playwright --version` | baseline runner | 0 | Playwright `1.60.0` |
| `npx.cmd playwright test --list` (baseline) | discovery before change | 0 | 7 tests in 1 file |
| `npx.cmd playwright test` (baseline) | baseline execution | 1 | BLOCKED: ffmpeg binary missing; runner reports 7 failed attempts |
| `npx.cmd playwright install ffmpeg` (sandbox) | install prerequisite | 124 | timed out |
| `npx.cmd playwright install ffmpeg` (approved) | retry prerequisite | 0 | command completed but binary still missing at execution |
| `node --check` for five active modules | import/syntax validation | 0 each | passed |
| `node --check` for all repository JavaScript source | final syntax validation | 0 | 0 syntax failures |
| `npx.cmd playwright test --list` (final) | discovery after change | 0 | 7 tests in 1 file |
| `npx.cmd playwright test --project=demo-e2e-chromium` | final active execution | 1 | BLOCKED: same missing ffmpeg binary |
| `npx.cmd playwright test --list --config=test-automation/playwright.config.ts` | nested-scaffold audit | 1 | 0 tests found |
| project-scoped `git diff --check` | whitespace/diff integrity | 0 | passed; unrelated nested generated report change preserved |

Final counts: listed successfully 7; passed 0; failed assertions 0; skipped 0; blocked 7. The runner's exit code is 1 because it records the environment error against each test, but the report classifies the result as BLOCKED according to the root cause.

## 15. Remaining Risks

- Reinstall/repair Playwright's ffmpeg cache, then rerun the final command below. If a browser binary is subsequently missing, install the configured browser/channel too.
- Practice examples require explicit target-system ownership, controlled data, and separation of embedded POM/API/schema/data before registration.
- Confirm whether root HTML assets and the `test-automation` scaffold should be retained or removed.

## 16. How to Add a New Test

1. Read `docs/PLAYWRIGHT_STRUCTURE.md` and choose a project owner.
2. Add a feature directory under `tests/e2e/` for the active demo, or define a new project with an exclusive `testMatch`.
3. Place fixture/data/resource/page/API files in responsibility-specific subdirectories under that feature.
4. Update the per-file dependency map and run discovery plus the affected project.

## 17. How to Run

```powershell
npm.cmd test
npm.cmd run test:demo
npx.cmd playwright test --project=demo-e2e-chromium
npx.cmd playwright test --list
npm.cmd run test:ui
npx.cmd playwright test --debug
npm.cmd run test:report
```

To repair the present blocking prerequisite, run `npx.cmd playwright install ffmpeg`, verify the binary is available, then rerun `npx.cmd playwright test --project=demo-e2e-chromium`.
