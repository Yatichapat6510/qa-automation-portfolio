*** Settings ***
Documentation
...    🎓 QA Workshop: Robot Framework สำหรับมือใหม่
...    ================================================
...    Target:    https://www.saucedemo.com
...    Username:  standard_user
...    Password:  secret_sauce
...
...    📚 วิธีรัน:
...    1. ติดตั้ง: pip install robotframework robotframework-seleniumlibrary
...    2. ติดตั้ง ChromeDriver ให้ตรงกับ Chrome ของคุณ
...    3. รันคำสั่ง: robot --variable BROWSER:chrome tests/web_tests.robot
...
...    🏷️ Tags ที่ใช้:
...    smoke      = ทดสอบหลักๆ (รันก่อนเสมอ)
...    negative   = ทดสอบกรณีผิดพลาด
...    beginner   = แบบฝึกหัดมือใหม่

Library          SeleniumLibrary    timeout=10s    implicit_wait=0s
Resource         locators.resource
Resource         keywords.resource

Suite Setup      เปิด Browser ไปที่ Login Page
Suite Teardown   ปิด Browser ทั้งหมด
Test Teardown    ถ่ายภาพหน้าจอถ้า Test Fail

*** Variables ***
${BROWSER}           chrome
${BASE_URL}          https://www.saucedemo.com
${VALID_USER}        standard_user
${VALID_PASS}        secret_sauce
${LOCKED_USER}       locked_out_user
${WRONG_PASS}        รหัสผ่านผิด

*** Test Cases ***

# ══════════════════════════════════════════════════════
# 📘 บทที่ 1: ทดสอบ Login
# ══════════════════════════════════════════════════════

TC-001: Login สำเร็จด้วย Credentials ที่ถูกต้อง
    [Documentation]
    ...    ✅ Happy Path: ทดสอบการ Login ปกติ
    ...    ขั้นตอน:
    ...    1. เข้า Login Page
    ...    2. กรอก Username และ Password
    ...    3. กด Login
    ...    4. ตรวจสอบว่าไปที่หน้า Products
    [Tags]    smoke    login    beginner    tc-001

    Given ผู้ใช้อยู่ที่หน้า Login
    When ผู้ใช้กรอก Username    ${VALID_USER}
    And ผู้ใช้กรอก Password    ${VALID_PASS}
    And ผู้ใช้กด Login
    Then ผู้ใช้ควรเห็นหน้า Products
    And หน้า Products ควรแสดงสินค้า

TC-002: Login ล้มเหลว - Account ถูก Lock
    [Documentation]
    ...    ❌ Negative Test: ผู้ใช้ที่ถูก Lock ไม่สามารถ Login ได้
    ...    Expected: แสดง Error Message
    [Tags]    negative    login    beginner    tc-002

    Given ผู้ใช้อยู่ที่หน้า Login
    When ผู้ใช้กรอก Username    ${LOCKED_USER}
    And ผู้ใช้กรอก Password    ${VALID_PASS}
    And ผู้ใช้กด Login
    Then ควรเห็น Error Message ว่า    Sorry, this user has been locked out

TC-003: Login ล้มเหลว - ไม่กรอก Username
    [Documentation]
    ...    ❌ Negative Test: กด Login โดยไม่กรอก Username
    ...    Expected: แสดงข้อความ "Username is required"
    [Tags]    negative    login    beginner    tc-003

    Given ผู้ใช้อยู่ที่หน้า Login
    When ผู้ใช้กด Login โดยไม่กรอกข้อมูล
    Then ควรเห็น Error Message ว่า    Username is required

TC-004: Login ล้มเหลว - รหัสผ่านไม่ถูกต้อง
    [Documentation]
    ...    ❌ Negative Test: Username ถูก แต่ Password ผิด
    [Tags]    negative    login    beginner    tc-004

    Given ผู้ใช้อยู่ที่หน้า Login
    When ผู้ใช้กรอก Username    ${VALID_USER}
    And ผู้ใช้กรอก Password    ${WRONG_PASS}
    And ผู้ใช้กด Login
    Then ควรเห็น Error Message ว่า    Username and password do not match

# ══════════════════════════════════════════════════════
# 📗 บทที่ 2: ทดสอบหน้า Products
# ══════════════════════════════════════════════════════

TC-005: หน้า Products แสดงสินค้า 6 ชิ้น
    [Documentation]
    ...    ✅ ตรวจสอบจำนวนสินค้าบนหน้า Products
    [Tags]    smoke    products    beginner    tc-005
    [Setup]    Login เข้าสู่ระบบ

    ${จำนวนสินค้า}=    นับจำนวน Element    ${LOCATOR_สินค้า}
    Should Be Equal As Numbers    ${จำนวนสินค้า}    6
    Log    พบสินค้า ${จำนวนสินค้า} รายการ

    [Teardown]    Logout ออกจากระบบ

TC-006: เพิ่มสินค้าเข้า Cart แล้วตรวจ Badge
    [Documentation]
    ...    ✅ ทดสอบการเพิ่มสินค้าเข้า Cart
    ...    ตรวจสอบว่า Badge บน Cart Icon แสดงจำนวนถูกต้อง
    [Tags]    smoke    cart    beginner    tc-006
    [Setup]    Login เข้าสู่ระบบ

    When กด "Add to Cart" สินค้าแรก
    Then Cart Badge ควรแสดงตัวเลข    1
    And ปุ่มควรเปลี่ยนเป็น "Remove"

    [Teardown]    Logout ออกจากระบบ

TC-007: ลบสินค้าออกจาก Cart
    [Documentation]
    ...    ✅ ทดสอบการลบสินค้าออกจาก Cart
    [Tags]    cart    beginner    tc-007
    [Setup]    Login เข้าสู่ระบบ

    Given กด "Add to Cart" สินค้าแรก
    And Cart Badge ควรแสดงตัวเลข    1
    When กดปุ่ม Remove สินค้าแรก
    Then Cart Badge ไม่ควรแสดง

    [Teardown]    Logout ออกจากระบบ

# ══════════════════════════════════════════════════════
# 📕 บทที่ 3: E2E Checkout Flow
# ══════════════════════════════════════════════════════

TC-008: กระบวนการ Checkout สมบูรณ์
    [Documentation]
    ...    ✅ E2E Test: ทดสอบทั้งกระบวนการซื้อสินค้า
    ...    Login → เลือกสินค้า → Cart → กรอกข้อมูล → สั่งซื้อ → ยืนยัน
    [Tags]    smoke    e2e    beginner    tc-008
    [Setup]    Login เข้าสู่ระบบ

    # ขั้นตอน 1: เลือกสินค้า
    When กด "Add to Cart" สินค้าแรก
    And Cart Badge ควรแสดงตัวเลข    1

    # ขั้นตอน 2: ไปหน้า Cart
    When คลิก Cart Icon
    Then ควรอยู่ที่หน้า Cart

    # ขั้นตอน 3: เริ่ม Checkout
    When คลิกปุ่ม Checkout
    Then ควรอยู่ที่หน้ากรอกข้อมูล

    # ขั้นตอน 4: กรอกข้อมูล
    When กรอกข้อมูล Shipping    สมชาย    ใจดี    10110
    And คลิกปุ่ม Continue
    Then ควรอยู่ที่หน้าสรุปคำสั่งซื้อ

    # ขั้นตอน 5: ยืนยันคำสั่งซื้อ
    When คลิกปุ่ม Finish
    Then ควรเห็นข้อความยืนยัน    Thank you for your order!

    [Teardown]    ปิด Browser ทั้งหมด
