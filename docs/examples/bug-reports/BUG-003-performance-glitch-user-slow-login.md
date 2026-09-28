# BUG-003: Login is noticeably slow for `performance_glitch_user`

| Field | Value |
| --- | --- |
| Environment | https://www.saucedemo.com, desktop Chrome (latest), normal broadband |
| Account | `performance_glitch_user` |
| Severity | Low |
| Priority | P2 |
| Type | Performance / usability |

## Summary

After submitting valid credentials, the transition to the Products page takes several seconds for `performance_glitch_user`, compared with under a second for `standard_user`.

## Steps to reproduce

1. Open https://www.saucedemo.com.
2. Log in as `standard_user`, note the time until the product list is visible, then log out.
3. Log in as `performance_glitch_user` and note the same time.

## Expected result

Both accounts reach the product list within the agreed target (for example under 2 seconds).

## Actual result

`performance_glitch_user` waits noticeably longer than the target. Record measured times for both accounts in the evidence section.

## Evidence

Measured times (fill in), Playwright trace or DevTools Network waterfall.

## Impact and risk

Slow login increases abandonment. Automated tests with default timeouts may also become flaky.

## Suggested automation

Measure `navigationStart` to the first product visible and assert against an explicit budget in a separate `@performance` project, so the functional suite does not depend on timing.
