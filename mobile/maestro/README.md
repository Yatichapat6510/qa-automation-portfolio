# Maestro Mobile Flows (Android)

Declarative YAML flows for the Sauce Labs *My Demo App* (`com.saucelabs.mydemoapp.android`).

## Contents

- `flow_test.yaml`: launches the app (smoke level).

## Prerequisites

- [Maestro CLI](https://maestro.mobile.dev) installed
- Android emulator or device visible in `adb devices`, with the demo app installed

## Run

```bash
maestro test mobile/maestro/flow_test.yaml
```

## Next steps

Add login, add-to-cart and checkout flows with `assertVisible` and `takeScreenshot`, then compare against the Appium implementation. See [`projects/mobile-maestro.md`](../../projects/mobile-maestro.md).
