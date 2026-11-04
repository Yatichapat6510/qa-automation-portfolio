*** Settings ***
Documentation     Page Object ของหน้า My Cart
Resource          ../common_android.resource

*** Variables ***
${CHECKOUT_BUTTON}     accessibility_id=Confirms products for checkout
${ITEM_TITLE}          id=${APP_PACKAGE}:id/titleTV
${TOTAL_ITEMS}         id=${APP_PACKAGE}:id/itemsTV
${TOTAL_PRICE}         id=${APP_PACKAGE}:id/totalPriceTV

*** Keywords ***
Cart Page Should Be Displayed
    [Documentation]    ปุ่ม Proceed To Checkout แสดงเฉพาะเมื่อมีสินค้าในตะกร้า
    Wait Until Element Is Visible    ${CHECKOUT_BUTTON}    ${TIMEOUT}

Cart Should Contain Only
    [Arguments]    ${product_name}
    ${titles}=    Get Webelements    ${ITEM_TITLE}
    Length Should Be    ${titles}    1
    Element Text Should Be    ${ITEM_TITLE}    ${product_name}

Cart Totals Should Be
    [Documentation]    ตรวจจำนวนชิ้นรวมและราคารวมตามรูปแบบที่แอปแสดง เช่น "2 Items" และ "$ 59.98"
    [Arguments]    ${expected_items_text}    ${expected_price_text}
    Element Text Should Be    ${TOTAL_ITEMS}    ${expected_items_text}
    Element Text Should Be    ${TOTAL_PRICE}    ${expected_price_text}
