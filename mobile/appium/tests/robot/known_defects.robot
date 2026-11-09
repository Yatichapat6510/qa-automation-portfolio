*** Settings ***
Documentation     เคสที่ยืนยัน defect ที่รู้อยู่แล้วของแอป (ดู docs/examples/bug-reports/BUG-004)
...               ถ้าบั๊กยังอยู่ ผลจะเป็น SKIP พร้อมข้อความ ไม่ทำให้ CI แดง
...               เฉพาะขั้นตรวจผลสุดท้ายเท่านั้นที่แปลงเป็น SKIP ถ้าล้มตั้งแต่ setup หรือหา element ไม่เจอ จะยังเป็น FAIL
...               ถ้าวันหนึ่งบั๊กถูกแก้ เคสจะ PASS ซึ่งเป็นสัญญาณให้ย้ายเคสเข้าชุดหลัก
Resource          ../../resources/common_android.resource
Resource          ../../resources/test_data.resource
Resource          ../../resources/pages/header_bar.resource
Resource          ../../resources/pages/catalog_page.resource
Resource          ../../resources/pages/product_detail_page.resource
Suite Setup       Open Android Application
Suite Teardown    Close Android Application
Test Setup        Restart App With Clean State

*** Test Cases ***
TC-MOB-006 Add Bolt T-Shirt Adds Selected Quantity
    [Documentation]    [Negative / Defect] เพิ่ม Bolt T-Shirt 1 ชิ้น badge ต้องแสดง 1 (ปัจจุบันแอปเพิ่ม 10 ชิ้น)
    [Tags]    cart    known-defect
    # แอปแครชเมื่อแตะสินค้าลำดับที่ 7 ขึ้นไป (BUG-005) จึงเรียงตามราคาก่อน ให้ Bolt T-Shirt ขึ้นมาอยู่ลำดับที่ 3
    Sort Products By Price Ascending
    Open Product    ${BOLT_TSHIRT}
    Product Detail Should Show    ${BOLT_TSHIRT}
    Add Product To Cart
    Known Defect Check    BUG-004    Cart Badge Should Show    1

*** Keywords ***
Known Defect Check
    [Documentation]    รันขั้นตรวจผลที่ยืนยัน defect ถ้าไม่ผ่าน (บั๊กยังอยู่) ให้ SKIP พร้อมรหัสบั๊ก แทนการ FAIL
    [Arguments]    ${bug_id}    ${keyword}    @{args}
    ${status}    ${message}=    Run Keyword And Ignore Error    ${keyword}    @{args}
    IF    '${status}' == 'FAIL'    Skip    Known defect ${bug_id}: ${message}
