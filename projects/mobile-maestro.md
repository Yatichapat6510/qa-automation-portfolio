# Mobile Flows with Maestro

**Implementation:** [`mobile/maestro/`](../mobile/maestro/)
**Stack:** Maestro (YAML flows)
**Target app:** Sauce Labs *My Demo App* (Android), same app as the Appium project

## Current evidence

`flow_test.yaml` launches the app by package id. It is a foundation that proves the environment works.

## Why Maestro alongside Appium

Maestro flows are short, declarative and quick to write, which suits smoke and happy-path checks. Appium gives programmatic control for complex logic. Showing both on the same app lets a reviewer compare the trade-offs.

## Next steps

1. Add flows for login, add-to-cart and checkout, with `assertVisible` checks.
2. Add `takeScreenshot` on key steps as evidence.
3. Run the flows on an Android emulator in CI (optional; document the setup if skipped).
4. Add a short comparison table: Maestro vs Appium for this app (setup time, stability, readability).
