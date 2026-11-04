*** Settings ***
Documentation     Page Object ของหน้า Products (หน้าแรกของแอป)
Resource          ../common_android.resource

*** Variables ***
${SORT_BUTTON}             accessibility_id=Shows current sorting order and displays available sorting options
${SORT_PRICE_ASCENDING}    accessibility_id=Ascending order by price
${FIRST_PRODUCT_TITLE}     android=new UiSelector().resourceId("${APP_PACKAGE}:id/titleTV").instance(0)

*** Keywords ***
Catalog Page Should Be Displayed
    Wait Until Element Is Visible    ${PRODUCT_LIST}    ${TIMEOUT}

Sort Products By Price Ascending
    [Documentation]    เรียงสินค้าตามราคาจากน้อยไปมาก แล้วรอจน dialog ปิดและรายการเรียงใหม่
    Click Element    ${SORT_BUTTON}
    Wait Until Element Is Visible    ${SORT_PRICE_ASCENDING}    ${TIMEOUT}
    Click Element    ${SORT_PRICE_ASCENDING}
    Wait Until Page Does Not Contain Element    ${SORT_PRICE_ASCENDING}    ${TIMEOUT}
    # สินค้าราคาถูกสุดคือ Onesie ($7.99) ใช้ยืนยันว่ารายการเรียงใหม่แล้วจริง
    Wait Until Keyword Succeeds    ${TIMEOUT}    0.5s
    ...    Element Text Should Be    ${FIRST_PRODUCT_TITLE}    Sauce Labs Onesie

Open Product
    [Documentation]    เลื่อนหาสินค้าตามชื่อ แล้วแตะรูปของสินค้านั้น
    ...    แอปผูก click listener ไว้ที่รูปสินค้าเท่านั้น จึงหา title ก่อนแล้วใช้ fromParent เลือกรูปใน card เดียวกัน
    [Arguments]    ${product_name}
    Catalog Page Should Be Displayed
    # ขั้นที่ 1: เลื่อนรายการจนเห็นชื่อสินค้า (เช่น Bolt T-Shirt อยู่ถัดจากสินค้าหลายสีจึงต้องเลื่อน)
    ${title_locator}=    Set Variable
    ...    android=new UiScrollable(new UiSelector().resourceId("${APP_PACKAGE}:id/scrollView")).scrollIntoView(new UiSelector().resourceId("${APP_PACKAGE}:id/titleTV").text("${product_name}"))
    Wait Until Element Is Visible    ${title_locator}    ${TIMEOUT}
    # ขั้นที่ 2: แตะรูปที่อยู่ใน card เดียวกับชื่อสินค้า
    ${image_locator}=    Set Variable
    ...    android=new UiSelector().resourceId("${APP_PACKAGE}:id/titleTV").text("${product_name}").fromParent(new UiSelector().resourceId("${APP_PACKAGE}:id/productIV"))
    Click Element    ${image_locator}
