*** Settings ***
Documentation    Keywords for calculating and verifying product prices on SauceDemo
Library          SeleniumLibrary

*** Keywords ***
Get Product Price
    [Arguments]    ${product_name}
    [Documentation]    Returns the price of a product as a float number
    ${price_text}=    Get Text    xpath=//*[normalize-space()="${product_name}"]/ancestor::div[contains(concat(' ', normalize-space(@class), ' '), ' cart_item ') or contains(concat(' ', normalize-space(@class), ' '), ' inventory_item ')][1]//div[contains(concat(' ', normalize-space(@class), ' '), ' inventory_item_price ')]
    ${price}=    Evaluate    float("${price_text}".replace('$', ''))
    RETURN    ${price}

Calculate Expected Total Price
    [Arguments]    @{product_names}
    [Documentation]    รวมราคาสินค้าทั้งหมดและคืนค่าเป็น float
    ${expected_total}=    Set Variable    0.0
    FOR    ${name}    IN    @{product_names}
        ${price}=    Get Product Price    ${name}
        ${expected_total}=    Evaluate    ${expected_total} + ${price}
    END
    RETURN    ${expected_total}

Verify Total Price Is Correct
    [Arguments]    ${expected_total}
    [Documentation]    เปรียบเทียบยอดรวมที่คำนวณกับ Item total ใน Checkout Overview
    ${actual_total_text}=    Get Text    xpath=//div[contains(@class, 'summary_subtotal_label')]
    ${actual_total}=    Evaluate    float("${actual_total_text}".replace('Item total: $', ''))
    Log    Expected: $${expected_total} | Actual: $${actual_total}
    Should Be Equal As Numbers    ${expected_total}    ${actual_total}    precision=2