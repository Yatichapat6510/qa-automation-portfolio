# เขียน keyword Dismiss Cookie Banner If Visible ที่ dismiss cookie banner 
# ถ้ามี แต่ไม่ fail ถ้าไม่มี — pattern นี้ใช้บ่อยมากกับ popups ที่อาจมีหรือไม่มีก็ได้

#IF/ELSE

*** Settings ***
Resource    ../../../resources/ui_keywords.robot


*** Variables ***
@{VALID_USERS}        standard_user    performance_glitch_user
@{INVALID_USERS}      locked_out_user  wrong_user


*** Keywords ***
Dismiss Cookie Banner If Visible
    [Documentation]    ปิด cookie banner ถ้ามี — ไม่ fail ถ้าไม่มี
    ${visible}=    Run Keyword And Return Status    Page Should Contain Element    id:cookie-banner

    IF    ${visible}
        Click Button    id:accept-cookies
        Wait Until Element Is Not Visible    id:cookie-banner    5s
        Log    Cookie banner dismissed
    ELSE
        Log    No cookie banner found — skipping
    END

Safe Click If Exists
    [Arguments]    ${locator}
    [Documentation]    คลิก element ถ้ามีอยู่ — ไม่ fail ถ้าไม่มี
    ${exists}=    Run Keyword And Return Status    Page Should Contain Element    ${locator}
    IF    ${exists}
        Click Element    ${locator}
    ELSE
        Log    Element ${locator} not found; skipping click
    END


*** Test Cases ***
TC Dismiss Cookie Banner If Present
    [Documentation]    Demonstrates IF/ELSE pattern — dismiss cookie banner if it exists, continue either way
    Login As Standard User
    Dismiss Cookie Banner If Visible
    Page Should Contain    Products
    [Teardown]    Close Browser

TC Safe Click On Optional Element
    [Documentation]    Demonstrates Safe Click If Exists — clicks only if element exists, no fail if missing
    Login As Standard User
    Safe Click If Exists    id:non-existent-promo-banner
    Page Should Contain    Products
    [Teardown]    Close Browser