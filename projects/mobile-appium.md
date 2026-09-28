# Mobile Automation with Appium

**Implementation:** [`mobile/appium/`](../mobile/appium/)
**Stack:** Appium 2 (UiAutomator2), Robot Framework AppiumLibrary, Python client
**Target app:** Sauce Labs *My Demo App* (Android)

## Current evidence

- Robot smoke test that opens the app and asserts the product list is visible (`tests/test.robot`).
- Python smoke script that starts an Appium session with W3C options (`tests/test_smoke.py`).
- Shared capabilities and keywords in `resources/common_android.resource`.
- Earlier learning exercises: [`learning/workshops/qa-automation-workshop/week06-mobile-appium`](../learning/workshops/qa-automation-workshop/week06-mobile-appium/).

This is a foundation, not yet a full suite. It proves the toolchain and session setup work.

## Target showcase layout

```text
mobile/appium/
├── tests/android/            # login, catalog, cart, checkout
├── screens/                  # Screen Object Model
├── resources/                # capabilities and keywords (no secrets)
├── docs/device-matrix.md
└── README.md
```

## Evidence checklist

- One Android critical flow (login, add to cart, checkout) with screen objects.
- Device/OS matrix with emulator configuration.
- Screenshot on failure and setup instructions.
- Documented platform differences, permissions and known limitations.
