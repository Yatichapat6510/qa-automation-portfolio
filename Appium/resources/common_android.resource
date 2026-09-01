*** Settings ***
Library    AppiumLibrary

*** Variables ***
${APPIUM_URL}          http://127.0.0.1:4723
${PLATFORM_NAME}       Android
${AUTOMATION_NAME}     UiAutomator2
${DEVICE_NAME}         emulator-5554
${APP_PACKAGE}         com.saucelabs.mydemoapp.android
${APP_ACTIVITY}        com.saucelabs.mydemoapp.android.MainActivity

*** Keywords ***
Open Android Application
    [Documentation]    เชื่อมต่อ Appium 2 Server ที่เปิดด้วย base path มาตรฐาน และเปิดแอปด้วย W3C capabilities
    Open Application    ${APPIUM_URL}
    ...    platformName=${PLATFORM_NAME}
    ...    appium:automationName=${AUTOMATION_NAME}
    ...    appium:deviceName=${DEVICE_NAME}
    ...    appium:appPackage=${APP_PACKAGE}
    ...    appium:appActivity=${APP_ACTIVITY}
    ...    appium:noReset=${TRUE}
    ...    appium:autoGrantPermissions=${TRUE}
    ...    appium:newCommandTimeout=120

Close Android Application
    [Documentation]    ปิด session และ quit driver
    Close Application