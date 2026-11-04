*** Settings ***
Documentation     ค่าเชื่อมต่อ Appium และ keyword ส่วนกลางสำหรับทุก suite
Library           AppiumLibrary    timeout=15    run_on_failure=Capture Page Screenshot

*** Variables ***
${APPIUM_URL}          http://127.0.0.1:4723
${PLATFORM_NAME}       Android
${AUTOMATION_NAME}     UiAutomator2
${DEVICE_NAME}         emulator-5554
${APP_PACKAGE}         com.saucelabs.mydemoapp.android
# Launcher activity ที่ประกาศไว้ใน AndroidManifest.xml ของแอป
${APP_ACTIVITY}        com.saucelabs.mydemoapp.android.view.activities.SplashActivity
${TIMEOUT}             15s
# หน้าแรกของแอปพร้อมใช้งานเมื่อรายการสินค้าแสดง
${PRODUCT_LIST}        accessibility_id=Displays all products of catalog
# Android 15 ขึ้นไปแสดง dialog "Android App Compatibility" กับแอปที่ยังไม่รองรับ memory page 16 KB
# dialog เป็นของระบบ ทำให้ UiAutomator2 มองไม่เห็นหน้าจอแอปจนกว่าจะปิด
${COMPAT_DIALOG_TITLE}             android=new UiSelector().resourceId("android:id/alertTitle").text("Android App Compatibility")
${COMPAT_DIALOG_DONT_SHOW_AGAIN}   id=android:id/button1

*** Keywords ***
Open Android Application
    [Documentation]    เชื่อมต่อ Appium Server (base path มาตรฐาน) และเปิดแอปด้วย W3C capabilities
    Open Application    ${APPIUM_URL}
    ...    platformName=${PLATFORM_NAME}
    ...    appium:automationName=${AUTOMATION_NAME}
    ...    appium:deviceName=${DEVICE_NAME}
    ...    appium:appPackage=${APP_PACKAGE}
    ...    appium:appActivity=${APP_ACTIVITY}
    ...    appium:noReset=${TRUE}
    ...    appium:autoGrantPermissions=${TRUE}
    ...    appium:newCommandTimeout=120
    # noReset=True ทำให้ Appium ไม่ปิดแอปตอนเปิด session ถ้าแอปค้างอยู่หน้าอื่นจากการรันก่อนหน้า (เช่น หน้า Login)
    # จะไม่เจอหน้า Products จึงรีสตาร์ทแอปทุกครั้งที่เริ่ม suite
    Restart App With Clean State

Close Android Application
    [Documentation]    ปิด session และ quit driver
    Close Application

Restart App With Clean State
    [Documentation]    ปิดแล้วเปิดแอปใหม่ก่อนแต่ละเทส
    ...    สถานะ login และตะกร้าของแอปเก็บในหน่วยความจำ การรีสตาร์ทจึงล้าง state ได้ครบ
    Terminate Application    ${APP_PACKAGE}
    Activate Application    ${APP_PACKAGE}
    Wait For App Ready

Wait For App Ready
    [Documentation]    รอจนหน้า Products แสดง ถ้า dialog ความเข้ากันได้ของระบบเด้งขึ้นก่อน ให้กด "Don't Show Again" แล้วรอต่อ
    # ปิดการถ่าย screenshot อัตโนมัติชั่วคราว เพราะการตรวจแบบวนซ้ำด้านล่างจะ fail ระหว่างรอเป็นเรื่องปกติ
    # ถ้าไม่ปิด log จะมี screenshot หลายสิบรูปและการรอช้าลงมาก
    ${previous}=    Register Keyword To Run On Failure    Nothing
    TRY
        Wait Until Keyword Succeeds    ${TIMEOUT}    0.5s    Product List Or Compat Dialog Should Be Visible
        ${dialog_shown}=    Run Keyword And Return Status    Wait Until Element Is Visible    ${COMPAT_DIALOG_TITLE}    1s
    FINALLY
        Register Keyword To Run On Failure    ${previous}
    END
    IF    ${dialog_shown}    Click Element    ${COMPAT_DIALOG_DONT_SHOW_AGAIN}
    # ขั้นสุดท้ายเปิด screenshot แล้ว ถ้าไม่เจอหน้า Products จริงจะได้ภาพไว้ตรวจ
    Wait Until Element Is Visible    ${PRODUCT_LIST}    ${TIMEOUT}

Product List Or Compat Dialog Should Be Visible
    [Documentation]    ผ่านเมื่อเห็นอย่างใดอย่างหนึ่ง ใช้คู่กับ Wait Until Keyword Succeeds
    ${list_shown}=    Run Keyword And Return Status    Wait Until Element Is Visible    ${PRODUCT_LIST}    0.5s
    ${dialog_shown}=    Run Keyword And Return Status    Wait Until Element Is Visible    ${COMPAT_DIALOG_TITLE}    0.5s
    Should Be True    ${list_shown} or ${dialog_shown}    App screen is not ready yet

Hide Keyboard If Shown
    [Documentation]    ซ่อนคีย์บอร์ดก่อนกดปุ่มที่อาจถูกบัง (ข้ามได้ถ้าคีย์บอร์ดไม่ได้แสดงอยู่)
    ${shown}=    Is Keyboard Shown
    IF    ${shown}    Hide Keyboard

Fill Text Field
    [Documentation]    ล้างช่องแล้วพิมพ์ข้อความ ถ้าข้อความว่างจะเว้นช่องไว้ (จำลองผู้ใช้ที่ไม่กรอก)
    [Arguments]    ${locator}    ${text}
    Wait Until Element Is Visible    ${locator}    ${TIMEOUT}
    Clear Text    ${locator}
    IF    $text != ''    Input Text    ${locator}    ${text}
