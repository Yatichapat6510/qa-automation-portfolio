*** Settings ***
Documentation    Mobile Keywords สำหรับมือใหม่ (พร้อม Comment อธิบาย)
Library          AppiumLibrary

*** Variables ***
# Locators
${MAIN_TITLE}      xpath=//android.widget.TextView[@text='API Demos']
${TEXT_FIELD}      xpath=(//android.widget.EditText)[1]

*** Keywords ***

เปิด App บน Emulator
    [Documentation]
    ...    เปิด App โดยส่ง Capabilities ไปให้ Appium Server
    ...
    ...    Capabilities คืออะไร?
    ...    = ข้อมูลที่บอก Appium ว่าจะรัน App อะไร บน Device ไหน

    ${capabilities}=    Create Dictionary
    ...    platformName=${PLATFORM}
    ...    platformVersion=${PLATFORM_VERSION}
    ...    deviceName=${DEVICE_NAME}
    ...    appPackage=${APP_PACKAGE}
    ...    appActivity=${APP_ACTIVITY}
    ...    automationName=UiAutomator2
    ...    noReset=True

    Open Application    ${APPIUM_URL}    &{capabilities}
    Log    ✅ เปิด App สำเร็จ

ปิด App
    [Documentation]    ปิด App หลัง Test ทำงานเสร็จ
    Close Application

App ควรแสดงหน้า Main ที่มีรายการเมนู
    [Documentation]    ตรวจสอบว่า App โหลดสำเร็จ
    Wait Until Element Is Visible    ${MAIN_TITLE}    timeout=15s
    Element Should Be Visible    ${MAIN_TITLE}

แตะที่เมนู
    [Documentation]
    ...    แตะ (Tap) บน Element ที่มีข้อความตามที่ระบุ
    ...    คล้ายกับ Click ใน Web Testing
    [Arguments]    ${menu_text}
    Click Element    xpath=//android.widget.TextView[@text='${menu_text}']
    Sleep    0.5s

หน้าจอควรแสดง Title
    [Documentation]    ตรวจสอบว่า Screen Title ตรงกับที่คาดหวัง
    [Arguments]    ${expected_title}
    Wait Until Element Is Visible
    ...    xpath=//android.widget.TextView[@text='${expected_title}']
    ...    timeout=5s

Scroll จนพบ
    [Documentation]
    ...    Scroll ลงเรื่อยๆ จนพบ Element ที่ต้องการ
    ...    Appium ใช้ UiScrollable สำหรับ Android
    [Arguments]    ${text}
    Scroll Element Into View
    ...    xpath=//android.widget.TextView[@text='${text}']

ควรเห็น Element ที่มีข้อความ
    [Documentation]    ตรวจว่า Element ที่มี text นั้นแสดงอยู่
    [Arguments]    ${text}
    Element Should Be Visible
    ...    xpath=//android.widget.TextView[@text='${text}']

เข้าไปที่ Views > TextFields
    [Documentation]    Navigate ไปยัง Views > TextFields
    แตะที่เมนู    Views
    Scroll จนพบ    EditText
    แตะที่เมนู    EditText

พิมพ์ข้อความ
    [Documentation]
    ...    แตะที่ Text Field แล้วพิมพ์ข้อความ
    ...    Mobile Keyboard จะปรากฏอัตโนมัติ
    [Arguments]    ${text}
    Click Element    ${TEXT_FIELD}
    Input Text       ${TEXT_FIELD}    ${text}

ช่องข้อความควรมีค่า
    [Documentation]    ตรวจสอบว่าข้อความที่พิมพ์ถูกบันทึก
    [Arguments]    ${expected}
    ${actual}=    Get Element Attribute    ${TEXT_FIELD}    text
    Should Contain    ${actual}    ${expected}

กด Hardware Back Button
    [Documentation]
    ...    กด Back Button บน Android Device
    ...    เหมือนกดปุ่ม ← บนโทรศัพท์
    Press Keycode    4

ควรกลับมาหน้า Main
    [Documentation]    ตรวจว่ากลับมาหน้า Main แล้ว
    Wait Until Element Is Visible    ${MAIN_TITLE}    timeout=5s
