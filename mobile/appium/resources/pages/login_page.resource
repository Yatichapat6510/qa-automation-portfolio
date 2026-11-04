*** Settings ***
Documentation     Page Object ของหน้า Login
Resource          ../common_android.resource

*** Variables ***
# ช่องกรอกข้อมูลไม่มี content-desc ในแอป จึงใช้ resource-id ซึ่งคงที่ทุก build
${USERNAME_INPUT}      id=${APP_PACKAGE}:id/nameET
${PASSWORD_INPUT}      id=${APP_PACKAGE}:id/passwordET
${LOGIN_BUTTON}        accessibility_id=Tap to login with given credentials
${USERNAME_ERROR}      id=${APP_PACKAGE}:id/nameErrorTV
${PASSWORD_ERROR}      id=${APP_PACKAGE}:id/passwordErrorTV

*** Keywords ***
Login Page Should Be Displayed
    Wait Until Element Is Visible    ${LOGIN_BUTTON}    ${TIMEOUT}

Submit Credentials
    [Documentation]    กรอกข้อมูลแล้วกด Login โดยไม่คาดหวังผลลัพธ์ ใช้ได้ทั้งเคสสำเร็จและเคส error
    [Arguments]    ${username}    ${password}
    Login Page Should Be Displayed
    Fill Text Field    ${USERNAME_INPUT}    ${username}
    Fill Text Field    ${PASSWORD_INPUT}    ${password}
    Hide Keyboard If Shown
    Click Element    ${LOGIN_BUTTON}

Login Page Should Be Closed
    [Documentation]    login สำเร็จแอปจะเปิด MainActivity ใหม่ ต้องรอให้หน้า Login หายก่อน
    ...    ไม่อย่างนั้นอาจกดเมนูระหว่างเปลี่ยนหน้า
    Wait Until Page Does Not Contain Element    ${LOGIN_BUTTON}    ${TIMEOUT}

Login Error Should Be
    [Documentation]    ตรวจข้อความ error ใต้ช่องที่ระบุ (username หรือ password)
    ...    error label ถูกตั้งเป็น INVISIBLE ไว้ก่อน การรอ visibility จึงยืนยันได้ว่าแอปแสดง error จริง
    [Arguments]    ${field}    ${expected_message}
    ${locator}=    Set Variable If    '${field}' == 'username'    ${USERNAME_ERROR}    ${PASSWORD_ERROR}
    Wait Until Element Is Visible    ${locator}    ${TIMEOUT}
    Element Text Should Be    ${locator}    ${expected_message}
