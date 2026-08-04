# *** Settings ***
# Resource    ../../../resources/ui_keywords.robot

# *** Keywords ***
# Add Product To Cart By Name
#     [Arguments]    ${product_name}
#     [Documentation]    เพิ่ม product ลง cart โดยระบุชื่อ — ใช้ได้กับทุก product
#     Click Button    xpath://div[contains(@class,'inventory_item_name')][text()='${product_name}']/ancestor::div[@class='inventory_item']//button[contains(@id,'add-to-cart')]

# Verify Cart Has N Items
#     [Arguments]    ${expected}
#     ${count}=    Get Text    class:shopping_cart_badge
#     Should Be Equal As Numbers    ${count}    ${expected}

# *** Test Cases ***
# TC Add Multiple Products Dynamic
#     Login As Standard User
#     Add Product To Cart By Name    Sauce Labs Backpack
#     Add Product To Cart By Name    Sauce Labs Bike Light
#     Add Product To Cart By Name    Sauce Labs Bolt T-Shirt
#     Verify Cart Has N Items    3
#     [Teardown]    Close Browser


*** Settings ***
Resource    ../../../resources/ui_keywords.robot

*** Test Cases ***
TC Add Multiple Products Dynamic
    Login As Standard User
    Add Product To Cart By Name    Sauce Labs Backpack
    Add Product To Cart By Name    Sauce Labs Bike Light
    Add Product To Cart By Name    Sauce Labs Bolt T-Shirt
    Verify Cart Has N Items    3
    [Teardown]    Close Browser