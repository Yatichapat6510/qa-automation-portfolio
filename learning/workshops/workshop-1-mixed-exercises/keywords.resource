*** Settings ***
Documentation
...    📚 Keywords Resource: Reusable Actions
...    ==========================================
...    Keyword = Action ที่ใช้ซ้ำได้หลาย Test
...    แต่ละ Keyword ทำสิ่งเดียว (Single Responsibility)
...    ชื่อ Keyword อ่านเข้าใจได้ทันที

Library          SeleniumLibrary
Resource         locators.resource

*** Keywords ***

# ════════════════════════════════════════
# 🛠️ SETUP / TEARDOWN KEYWORDS
# ════════════════════════════════════════

เปิด Browser ไปที่ Login Page
    [Documentation]    เปิด Chrome และไปที่หน้า Login
    Open Browser    ${BASE_URL}    ${BROWSER}
    Maximize Browser Window
    Title Should Be    Swag Labs
    Log    ✅ เปิด Browser สำเร็จ

ปิด Browser ทั้งหมด
    [Documentation]    ปิด Browser หลัง Test เสร็จ
    Close All Browsers

ถ่ายภาพหน้าจอถ้า Test Fail
    [Documentation]    บันทึกภาพเมื่อ Test ล้มเหลว (ช่วย Debug)
    Run Keyword If Test Failed    Capture Page Screenshot    filename=EMBED

Login เข้าสู่ระบบ
    [Documentation]    Setup Keyword สำหรับ Test ที่ต้องการ Login ก่อน
    Go To    ${BASE_URL}
    ผู้ใช้อยู่ที่หน้า Login
    ผู้ใช้กรอก Username    ${VALID_USER}
    ผู้ใช้กรอก Password    ${VALID_PASS}
    ผู้ใช้กด Login
    ผู้ใช้ควรเห็นหน้า Products

Logout ออกจากระบบ
    [Documentation]    Teardown Keyword: Logout เพื่อให้ Test ถัดไปเริ่มใหม่
    Click Element    ${LOCATOR_MenuButton}
    Wait Until Element Is Visible    ${LOCATOR_LogoutLink}    timeout=5s
    Click Element    ${LOCATOR_LogoutLink}
    ผู้ใช้อยู่ที่หน้า Login

# ════════════════════════════════════════
# 🔑 LOGIN KEYWORDS
# ════════════════════════════════════════

ผู้ใช้อยู่ที่หน้า Login
    [Documentation]    ตรวจสอบว่าอยู่ที่ Login Page
    Wait Until Element Is Visible    ${LOCATOR_ปุ่มLogin}    timeout=10s
    Location Should Be    ${BASE_URL}/

ผู้ใช้กรอก Username
    [Documentation]    กรอก Username ในช่องที่กำหนด
    [Arguments]    ${username}
    Input Text    ${LOCATOR_ช่องUsername}    ${username}

ผู้ใช้กรอก Password
    [Documentation]    กรอก Password ในช่องที่กำหนด
    [Arguments]    ${password}
    Input Text    ${LOCATOR_ช่องPassword}    ${password}

ผู้ใช้กด Login
    [Documentation]    กดปุ่ม Login
    Click Button    ${LOCATOR_ปุ่มLogin}

ผู้ใช้กด Login โดยไม่กรอกข้อมูล
    [Documentation]    ล้างฟอร์มแล้วกด Login ทันที
    Clear Element Text    ${LOCATOR_ช่องUsername}
    Clear Element Text    ${LOCATOR_ช่องPassword}
    Click Button    ${LOCATOR_ปุ่มLogin}

# ════════════════════════════════════════
# ✅ ASSERTION KEYWORDS (ตรวจสอบ)
# ════════════════════════════════════════

ผู้ใช้ควรเห็นหน้า Products
    [Documentation]    ตรวจสอบว่า Login สำเร็จและเห็นหน้า Products
    Wait Until Location Contains    /inventory    timeout=10s
    Page Should Contain    Products
    Log    ✅ Login สำเร็จ! อยู่ที่หน้า Products

หน้า Products ควรแสดงสินค้า
    [Documentation]    ตรวจสอบว่ามีสินค้าแสดงอยู่
    ${count}=    Get Element Count    ${LOCATOR_สินค้า}
    Should Be True    ${count} > 0
    Log    ✅ พบสินค้า ${count} รายการ

ควรเห็น Error Message ว่า
    [Documentation]    ตรวจสอบ Error Message ที่แสดง
    [Arguments]    ${expected_text}
    Wait Until Element Is Visible    ${LOCATOR_ข้อความError}    timeout=5s
    Element Should Contain    ${LOCATOR_ข้อความError}    ${expected_text}
    Log    ✅ พบ Error Message: ${expected_text}

Cart Badge ควรแสดงตัวเลข
    [Documentation]    ตรวจสอบตัวเลขบน Cart Badge
    [Arguments]    ${expected_count}
    Wait Until Element Is Visible    ${LOCATOR_CartBadge}    timeout=5s
    Element Should Contain    ${LOCATOR_CartBadge}    ${expected_count}
    Log    ✅ Cart Badge แสดง: ${expected_count}

Cart Badge ไม่ควรแสดง
    [Documentation]    ตรวจสอบว่า Cart ว่างเปล่า (ไม่มี Badge)
    Element Should Not Be Visible    ${LOCATOR_CartBadge}
    Log    ✅ Cart ว่างเปล่า (ไม่มี Badge)

ควรอยู่ที่หน้า Cart
    [Documentation]    ตรวจ URL ว่าอยู่ที่หน้า Cart
    Wait Until Location Contains    /cart    timeout=5s
    Page Should Contain    Your Cart

ควรอยู่ที่หน้ากรอกข้อมูล
    [Documentation]    ตรวจว่าอยู่ที่ Checkout Step 1
    Wait Until Location Contains    /checkout-step-one    timeout=5s

ควรอยู่ที่หน้าสรุปคำสั่งซื้อ
    [Documentation]    ตรวจว่าอยู่ที่ Checkout Step 2
    Wait Until Location Contains    /checkout-step-two    timeout=5s
    Page Should Contain    Checkout: Overview

ควรเห็นข้อความยืนยัน
    [Documentation]    ตรวจสอบข้อความยืนยันการสั่งซื้อ
    [Arguments]    ${expected_text}
    Wait Until Location Contains    /checkout-complete    timeout=10s
    Wait Until Element Is Visible    ${LOCATOR_ข้อความComplete}    timeout=10s
    Element Should Contain    ${LOCATOR_ข้อความComplete}    ${expected_text}
    Log    ✅ สั่งซื้อสำเร็จ!

# ════════════════════════════════════════
# 🛍️ PRODUCT / CART KEYWORDS
# ════════════════════════════════════════

นับจำนวน Element
    [Documentation]    นับจำนวน Element ที่ match กับ locator
    [Arguments]    ${locator}
    ${count}=    Get Element Count    ${locator}
    RETURN    ${count}

กด "Add to Cart" สินค้าแรก
    [Documentation]    กดปุ่ม Add to Cart ของสินค้าแรกในหน้า
    Wait Until Element Is Visible    ${LOCATOR_ปุ่มAddToCart_แรก}
    Click Button    ${LOCATOR_ปุ่มAddToCart_แรก}
    Log    ✅ เพิ่มสินค้าแรกเข้า Cart แล้ว

ปุ่มควรเปลี่ยนเป็น "Remove"
    [Documentation]    ตรวจว่าปุ่มเปลี่ยนจาก Add to Remove
    Wait Until Element Is Visible    ${LOCATOR_ปุ่มRemove_แรก}    timeout=5s

กดปุ่ม Remove สินค้าแรก
    [Documentation]    กดปุ่ม Remove ของสินค้าแรก
    Click Button    ${LOCATOR_ปุ่มRemove_แรก}

คลิก Cart Icon
    [Documentation]    คลิกที่ Cart Icon บน Navigation Bar
    Click Element    ${LOCATOR_CartIcon}

คลิกปุ่ม Checkout
    [Documentation]    กดปุ่ม Checkout ในหน้า Cart
    Wait Until Element Is Visible    ${LOCATOR_ปุ่มCheckout}
    Click Button    ${LOCATOR_ปุ่มCheckout}

กรอกข้อมูล Shipping
    [Documentation]    กรอกข้อมูลสำหรับจัดส่ง
    [Arguments]    ${first_name}    ${last_name}    ${zip}
    Input Text    ${LOCATOR_ช่องFirstName}    ${first_name}
    Input Text    ${LOCATOR_ช่องLastName}     ${last_name}
    Input Text    ${LOCATOR_ช่องZipCode}      ${zip}

คลิกปุ่ม Continue
    [Documentation]    กดปุ่ม Continue เพื่อไปขั้นตอนถัดไป
    Click Button    ${LOCATOR_ปุ่มContinue}

คลิกปุ่ม Finish
    [Documentation]    กดปุ่ม Finish เพื่อยืนยันคำสั่งซื้อ
    Click Button    ${LOCATOR_ปุ่มFinish}
