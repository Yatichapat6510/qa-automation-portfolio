# Playwright Quality Engineering Project

The active suite is production-oriented and isolated under `tests/e2e`. The
default configuration discovers only `tests/e2e/**/specs/*.spec.*`; all
learning, draft, and experimental material lives in `tests/practice` and is
not executed by default.

```powershell
npm.cmd test
npm.cmd run test:list
npm.cmd run test:demo
npm.cmd run test:sauce-demo
npm.cmd run test:headed
npm.cmd run test:ui
```

Default and VS Code Test Explorer runs are headless. Use `--headed` or `--ui`
when visual browser interaction is required. See `docs/PLAYWRIGHT_STRUCTURE.md`
for ownership, layout, and promotion rules.
