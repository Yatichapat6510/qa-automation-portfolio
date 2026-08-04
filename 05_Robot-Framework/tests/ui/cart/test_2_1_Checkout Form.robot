# หลัง add to cart แล้วไปหน้า Checkout — เขียน keywords เพื่อกรอก First Name, Last Name, Zip Code 
# แล้วกด Continue และ verify ว่าไปถึงหน้า Overview

*** Settings ***
Resource    ../../../resources/ui_keywords.robot

*** Keywords ***
Fill Checkout Information
    [Arguments]    ${first}    ${last}    ${zip}
    Input Text    id:first-name    ${first}
    Input Text    id:last-name     ${last}
    Input Text    id:postal-code   ${zip}
    Click Button  id:continue

Verify Checkout Overview Page
    Page Should Contain    Checkout: Overview
    Element Should Be Visible    id:finish

*** Test Cases ***
TC Complete Checkout Flow
    Login As Standard User
    Add Product To Cart By Name    Sauce Labs Backpack
    Click Element    class:shopping_cart_link
    Click Button     id:checkout
    Fill Checkout Information    John    Doe    90210
    Verify Checkout Overview Page
    Click Button     id:finish
    Page Should Contain    Thank you for your order
    [Teardown]    Close Browser