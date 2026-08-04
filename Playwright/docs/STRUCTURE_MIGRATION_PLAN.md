# Structure Migration Plan

**Prepared:** 2026-07-24  
**Scope:** Active `demo-e2e-chromium` feature only. The practice library, legacy HTML assets, and empty nested scaffold remain unchanged because their owner or external/manual usage is not proven.

| Current Path | Proposed Path | Classification | Owner | Reason | Imports Affected | Risk |
|---|---|---|---|---|---|---|
| `tests/e2e/interaction-workflows/resources/demo-pages.resource.js` | `tests/e2e/interaction-workflows/app-content/demo-pages.js` | TEST-SPECIFIC application content | `demo-e2e-chromium` | The module supplies HTML only to the feature fixture; `resources` is too broad and implies sharing that does not exist. | `fixtures/demo-app.fixture.js` | Low: one verified direct import; syntax, listing, and project suite will be rerun. |

Migration order:

1. Safe move of the verified single-consumer module.
2. Update the fixture import and ownership documentation.
3. Run JavaScript syntax validation, `npx.cmd playwright test --list`, and the affected project suite.

No fixture consolidation, config cleanup, shared extraction, or file removal is planned: there is one active project, one active fixture, and no unused source file whose non-code/manual ownership can be disproven.
