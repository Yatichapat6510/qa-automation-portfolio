*** Settings ***
Documentation
...    🎓 QA Workshop: Appium Mobile Testing สำหรับมือใหม่
...    =====================================================
...    Target App:  ApiDemos (Android Demo App)
...    ดาวน์โหลด:   https://github.com/appium/appium/tree/master/packages/appium/sample-code/apps
...
...    📱 Appium คืออะไร?
...    = เครื่องมือ Automate Test บน Mobile (iOS/Android)
...    ทำงานเหมือน Selenium แต่สำหรับ Mobile
...
...    📚 ต้องติดตั้งก่อน:
...    1. Java JDK 11+
...    2. Android Studio + Emulator
...    3. Node.js + Appium: npm install -g appium
...    4. Driver: appium driver install uiautomator2
...    5. Python library: pip install robotframework-appiumlibrary
...
...    🚀 วิธีรัน:
...    1. เปิด Emulator
...    2. เปิด Appium Server: appium
...    3. robot appium/tests/mobile_tests.robot

Library          AppiumLibrary    run_on_failure=Capture Page Screenshot
Resource         mobile_keywords.resource

Suite Setup      เปิด App บน Emulator
Suite Teardown   ปิด App

*** Variables ***
# ─── Appium Connection ───────────────────────────────
${APPIUM_URL}          http://127.0.0.1:4723/wd/hub

# ─── Device Settings (แก้ให้ตรงกับ Emulator ของคุณ) ──
${PLATFORM}            Android
${PLATFORM_VERSION}    13.0
${DEVICE_NAME}         emulator-5554

# ─── App Settings ─────────────────────────────────────
${APP_PACKAGE}         io.appium.android.apis
${APP_ACTIVITY}        .ApiDemos

*** Test Cases ***

# ══════════════════════════════════════════════════
# 📘 บทที่ 1: เปิด App และ Navigate
# ══════════════════════════════════════════════════

TC-M001: App เปิดได้และแสดงหน้า Main
    [Documentation]
    ...    ✅ Smoke Test: ตรวจสอบว่า App เปิดได้ปกติ
    [Tags]    smoke    mobile    beginner

    App ควรแสดงหน้า Main ที่มีรายการเมนู
    Log    ✅ App เปิดได้สำเร็จ

TC-M002: Tap เพื่อเข้า Views Section
    [Documentation]
    ...    ✅ ทดสอบการ Tap บน Element และ Navigate
    [Tags]    navigation    mobile    beginner

    When แตะที่เมนู    Views
    Then หน้าจอควรแสดง Title    Views
    Log    ✅ Navigate ไปหน้า Views สำเร็จ

TC-M003: Scroll หา Element ที่อยู่ล่าง
    [Documentation]
    ...    ✅ ทดสอบการ Scroll บน Mobile Screen
    ...    (เพราะหน้าจอ Mobile เล็ก มักต้อง Scroll หา Element)
    [Tags]    scroll    mobile    beginner

    When Scroll จนพบ    Text
    Then ควรเห็น Element ที่มีข้อความ    Text
    Log    ✅ Scroll และพบ Element สำเร็จ

# ══════════════════════════════════════════════════
# 📗 บทที่ 2: Input และ Interaction
# ══════════════════════════════════════════════════

TC-M004: พิมพ์ข้อความใน Text Field
    [Documentation]
    ...    ✅ ทดสอบการพิมพ์ข้อความบน Mobile Keyboard
    [Tags]    input    mobile    beginner

    Given เข้าไปที่ Views > TextFields
    When พิมพ์ข้อความ    ทดสอบ QA Workshop
    Then ช่องข้อความควรมีค่า    ทดสอบ QA Workshop

TC-M005: กด Back Button กลับหน้าก่อน
    [Documentation]
    ...    ✅ ทดสอบ Hardware Back Button บน Android
    [Tags]    navigation    mobile    beginner

    Given แตะที่เมนู    Views
    When กด Hardware Back Button
    Then ควรกลับมาหน้า Main
