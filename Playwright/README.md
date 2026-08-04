# Playwright practice project

The active, runnable test suite is in `tests/e2e/interaction-workflows`. Its
deterministic demo pages are test-specific application content in
`tests/e2e/interaction-workflows/app-content`, with the Playwright fixture and
file-upload data colocated under the same feature owner. See
`docs/PLAYWRIGHT_STRUCTURE.md` for the dependency rules and ownership map.

## Run in VS Code

Open this folder as the workspace, then use **Terminal > Run Task** and choose
**Playwright: run all demo tests**. You can also run:

```powershell
npm.cmd test
npm.cmd run test:headed
npm.cmd run test:ui
npm.cmd run test:report
```

`tests/Start Practice`, `tests/All Practice`, and `tests/sandbox` are legacy
learning files. They are intentionally excluded from `npm test` because they
target several unrelated sites and incomplete routes. Move a completed exercise
into `tests/e2e` only after its target URL and assertions are verified.

## Using a real application

The interaction workflow presently runs against a local routed demo so it is
reliable without a deployed application. When the real app exists, set its URL
and replace the routed demo fixture with the real setup:

```powershell
$env:BASE_URL = 'https://your-app.example'
npm.cmd test
```
