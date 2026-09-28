# Test Dependency Map

```text
playwright.config.js
|-- configs/environment.js
|-- configs/projects.js
|-- demo-e2e-chromium
|   `-- tests/e2e/demo-app/specs/*.spec.js
|       |-- fixtures/demo-app.fixture.js
|       |   `-- app-content/demo-pages.js
|       `-- data/upload-files.data.js (interaction workflow only)
`-- sauce-demo-chromium
    `-- tests/e2e/sauce-demo/specs/*.spec.js
        |-- fixtures/app.fixture.js
        |   |-- app-content/sauce-demo.pages.js
        |   |-- data/credentials.data.js
        |   `-- pages/*.page.js
        `-- data/credentials.data.js
```

## Module classifications

- `tests/e2e/demo-app/fixtures`, `data`, and specs: PROJECT-SPECIFIC to
  `demo-e2e-chromium`; `app-content/demo-pages.js` is TEST-SPECIFIC.
- `tests/e2e/sauce-demo/fixtures`, pages, and specs: PROJECT-SPECIFIC to
  `sauce-demo-chromium`; its data and in-memory content are TEST-SPECIFIC.
- `configs/*`: active configuration modules.
- `tests/practice/**`: unregistered practice-only material; it is intentionally
  outside the root config's `testDir` and has no active project owner.

Every spec using a custom fixture imports both `test` and `expect` from that
fixture entry point. No active dependency reaches into `tests/practice`.
