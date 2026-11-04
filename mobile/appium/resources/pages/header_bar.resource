*** Settings ***
Documentation     Component แถบด้านบน (เมนู + ตะกร้า) ที่แสดงในทุกหน้าของ MainActivity
Resource          ../common_android.resource

*** Variables ***
${MENU_BUTTON}         accessibility_id=View menu
${CART_BUTTON}         accessibility_id=View cart
${CART_BADGE}          id=${APP_PACKAGE}:id/cartTV
# เมนู Log In / Log Out อยู่ท้ายรายการ ใช้ UiScrollable ที่ระบุ menuRV เพื่อไม่ให้ไปเลื่อนรายการสินค้าด้านหลัง
${LOGIN_MENU_ITEM}     android=new UiScrollable(new UiSelector().resourceId("${APP_PACKAGE}:id/menuRV")).scrollIntoView(new UiSelector().description("Login Menu Item"))
${LOGOUT_MENU_ITEM}    android=new UiScrollable(new UiSelector().resourceId("${APP_PACKAGE}:id/menuRV")).scrollIntoView(new UiSelector().description("Logout Menu Item"))

*** Keywords ***
Open Side Menu
    Wait Until Element Is Visible    ${MENU_BUTTON}    ${TIMEOUT}
    Click Element    ${MENU_BUTTON}

Go To Login From Menu
    [Documentation]    เปิดเมนูแล้วไปหน้า Login
    Open Side Menu
    Wait Until Element Is Visible    ${LOGIN_MENU_ITEM}    ${TIMEOUT}
    Click Element    ${LOGIN_MENU_ITEM}

User Should Be Logged In
    [Documentation]    สถานะ login ดูจากเมนู: ถ้า login แล้วจะแสดง "Log Out" แทน "Log In"
    Open Side Menu
    Wait Until Element Is Visible    ${LOGOUT_MENU_ITEM}    ${TIMEOUT}

Cart Badge Should Show
    [Documentation]    badge ถูกซ่อนเมื่อตะกร้าว่าง จึงรอให้แสดงก่อนตรวจตัวเลข
    [Arguments]    ${expected_count}
    Wait Until Element Is Visible    ${CART_BADGE}    ${TIMEOUT}
    Element Text Should Be    ${CART_BADGE}    ${expected_count}

Open Cart
    Click Element    ${CART_BUTTON}
