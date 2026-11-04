*** Settings ***
Documentation     ทดสอบหน้า Login: TC-MOB-001 ถึง TC-MOB-004 (รายละเอียดใน docs/test-cases.md)
Resource          ../resources/common_android.resource
Resource          ../resources/test_data.resource
Resource          ../resources/pages/header_bar.resource
Resource          ../resources/pages/login_page.resource
Resource          ../resources/pages/catalog_page.resource
Suite Setup       Open Android Application
Suite Teardown    Close Android Application
Test Setup        Restart App With Clean State

*** Test Cases ***
TC-MOB-001 Login With Valid Credentials
    [Documentation]    [Positive] login สำเร็จต้องกลับมาหน้า Products และเมนูเปลี่ยนเป็น Log Out
    [Tags]    smoke    login
    Go To Login From Menu
    Submit Credentials    ${VALID_USER}    ${PASSWORD}
    Login Page Should Be Closed
    Catalog Page Should Be Displayed
    User Should Be Logged In

TC-MOB-002 Login With Locked Out User
    [Documentation]    [Negative] บัญชีที่ถูกล็อกต้องแสดง error และไม่เข้าสู่ระบบ
    [Tags]    login    negative
    [Template]    Login Should Fail With Error
    ${LOCKED_USER}    ${PASSWORD}    password    Sorry this user has been locked out.

TC-MOB-003 Login With Empty Password
    [Documentation]    [Negative] ไม่กรอก Password ต้องแสดง error ที่ช่อง Password
    [Tags]    login    negative
    [Template]    Login Should Fail With Error
    ${VALID_USER}    ${EMPTY}    password    Enter Password

TC-MOB-004 Login With Whitespace-Only Username
    [Documentation]    [Edge] แอป trim ค่า username ก่อนตรวจ ช่องว่างล้วนจึงต้องถูกมองว่าเป็นค่าว่าง
    [Tags]    login    edge
    [Template]    Login Should Fail With Error
    ${SPACE * 3}    ${PASSWORD}    username    Username is required

*** Keywords ***
Login Should Fail With Error
    [Documentation]    ขั้นตอนร่วมของเคส login ไม่สำเร็จ: ส่งข้อมูล ตรวจ error และยืนยันว่ายังอยู่หน้า Login
    [Arguments]    ${username}    ${password}    ${field}    ${expected_message}
    Go To Login From Menu
    Submit Credentials    ${username}    ${password}
    Login Error Should Be    ${field}    ${expected_message}
    Login Page Should Be Displayed
