# *** Settings ***
# Resource    ../../../resources/ui_keywords.robot

# *** Keywords ***
# Verify Product Page Locators
#     #1. ชื่อ product - หาด้วย Text
#     Element Should Be Visible    xpath://div[contains(@class,'inventory_item_name')][text()='Sauce Labs Backpack']

#     # 2. ปุ่ม Add to Cart ของ product นั้น — ใช้ ancestor
#     Click Button    xpath://div[contains(@class,'inventory_item_name')][text()='Sauce Labs Backpack']/ancestor::div[@class='inventory_item']//button

#     # 3. Cart icon มุมบนขวา
#     Click Element    class:shopping_cart_link

# *** Test Cases ***
# TC Verify Specific Item Locators
#     Login As Standard User
#     Verify Product Page Locators
#     [Teardown]    Close Browser



*** Settings ***

Resource        ../../../resources/ui_keywords.robot

*** Keywords ***

Verify Product Page Locators
    #1. ชื่อ Product - หาด้วย Text
    Element Should Be Visible        xpath://div[contains(@class,'inventory_item_name')][text()='Sauce Labs Backpack']

    # 2. ปุ่ม Add to Cart ของ product นั้น — ใช้ ancestor
    Click Button                     xpath://div[contains(@class,'inventory_item_name')][text()='Sauce Labs Backpack']/ancestor::div[@class='inventory_item']//button

    # 3. Cart icon มุมบนขวา
    Click Element                   class:shopping_cart_link

*** Test Cases ***
TC Verify Specific Item Locators
    Login As Standard User
    Verify Product Page Locators
    [Teardown]    Close Browser