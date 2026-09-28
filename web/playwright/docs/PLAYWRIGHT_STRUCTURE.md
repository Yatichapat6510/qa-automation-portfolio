# Playwright Structure

## Executable suite

`playwright.config.js` is the only active configuration. It discovers tests
only below `tests/e2e/**/specs`, so the default CLI run and VS Code Testing
Explorer cannot execute learning material under `tests/practice`.

```text
configs/
|-- environment.js                 # active environment/base URL
`-- projects.js                    # named executable Playwright projects
utils/                             # shared helpers (two-project consumer minimum)
tests/
|-- e2e/                           # executable, deterministic suite
|   |-- demo-app/
|   |   |-- app-content/           # TEST-SPECIFIC in-memory application
|   |   |-- data/                  # PROJECT-SPECIFIC test data
|   |   |-- fixtures/              # PROJECT-SPECIFIC custom fixtures
|   |   `-- specs/                 # executable demo-app specifications
|   `-- sauce-demo/
|       |-- app-content/
|       |-- data/
|       |-- fixtures/
|       |-- pages/                 # PROJECT-SPECIFIC page objects
|       `-- specs/                 # executable SauceDemo specifications
`-- practice/                      # excluded from active discovery
    |-- fundamentals/               # guided learning exercises
    |-- draft-specs/                # incomplete/legacy examples and HTML fixtures
    `-- experimental/               # sandbox experiments and archived scaffold
```

## Projects and ownership

| Project | Test match | Owner/classification |
|---|---|---|
| `demo-e2e-chromium` | `demo-app/specs/**/*.spec.[jt]s` | PROJECT-SPECIFIC demo application suite |
| `sauce-demo-chromium` | `sauce-demo/specs/**/*.spec.[jt]s` | PROJECT-SPECIFIC SauceDemo suite |

The demo-app and SauceDemo fixtures own their application routes. Data never
imports specs or fixtures, and page objects do not import specs. There are no
shared modules because the two projects have no shared consumer module.

## Browser behavior

`use.headless` is `true`, which keeps CLI and VS Code Testing Explorer runs
headless. `npx.cmd playwright test --headed` overrides that setting and
`npx.cmd playwright test --ui` opens Playwright UI mode.

## Legacy material

`tests/practice/draft-specs` contains former root resources, page-object
examples, a package template, and incomplete specs. `experimental` contains
sandbox tests and the archived nested Playwright scaffold. They are preserved
for learning/reference only and must be promoted into a named E2E project only
after they are made deterministic and independently verified.

## Commands

```powershell
npx.cmd playwright test --list
npx.cmd playwright test
npx.cmd playwright test --project=demo-e2e-chromium
npx.cmd playwright test --project=sauce-demo-chromium
npx.cmd playwright test --headed
npx.cmd playwright test --ui
```
