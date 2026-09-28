# Appium Mobile Automation (Android)

Foundation for mobile UI automation against the Sauce Labs *My Demo App* (`com.saucelabs.mydemoapp.android`).

## Contents

```text
mobile/appium/
├── resources/common_android.resource   # AppiumLibrary keywords + W3C capabilities
└── tests/
    ├── test.robot                      # Robot smoke test: app opens, product list visible
    └── test_smoke.py                   # Python client: starts and closes an Appium session
```

## Prerequisites

- Node.js 20+, Appium 2 with the UiAutomator2 driver: `npm i -g appium && appium driver install uiautomator2`
- Android SDK with an emulator (or a device) visible in `adb devices`
- The demo app APK installed on the emulator
- Python 3.11+ with `pip install robotframework robotframework-appiumlibrary Appium-Python-Client`

## Run

```bash
appium                                   # terminal 1: start the server on 127.0.0.1:4723
robot -d results mobile/appium/tests/test.robot   # terminal 2 (from repository root)
python mobile/appium/tests/test_smoke.py
```

Edit `DEVICE_NAME` in `common_android.resource` (and in the Python script) to match `adb devices`.

## Status and next steps

Smoke level: proves the toolchain and session setup. Next: screen objects, login-to-checkout flow, screenshot on failure, device matrix. See [`projects/mobile-appium.md`](../../projects/mobile-appium.md).
