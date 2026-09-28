*** Settings ***
Library           SeleniumLibrary
Library           Collections
Suite Setup       Open Browser Setup
Suite Teardown    Close All Browsers
Test Teardown     Run Keyword If Test Failed    Capture Page Screenshot

*** Variables ***
@{PRODUCTS}    Sauce Labs Backpack    Sauce Labs Bike Light
&{CUSTOMER}    first=John    last=Doe    zip=90210

*** Test Cases ***
TC Full E2E Checkout Flow
    [Tags]    smoke    e2e
    Login As Standard User
    Add Multiple Products To Cart    @{PRODUCTS}
    Verify Cart Has N Items    2
    Proceed To Checkout
    Fill Checkout Information    ${CUSTOMER.first}    ${CUSTOMER.last}    ${CUSTOMER.zip}
    Verify Order Summary Is Visible
    Complete Order
    Verify Order Confirmation

*** Keywords ***
Open Browser Setup
    &{prefs}=    Create Dictionary
    ...    credentials_enable_service=${False}
    ...    profile.password_manager_enabled=${False}
    ...    profile.password_manager_leak_detection=${False}
    Open Browser    https://www.saucedemo.com    chrome
    ...    options=add_argument("--disable-notifications");add_experimental_option("prefs", ${prefs})
    Maximize Browser Window
    Set Selenium Speed    0.2

Login As Standard User
    Go To    https://www.saucedemo.com
    Input Text    id=user-name    standard_user
    Input Text    id=password     secret_sauce
    Wait Until Element Is Enabled    id=login-button
    Click Button    id=login-button
    Wait Until Page Contains    Products

Verify Cart Has N Items
    [Arguments]    ${count}
    Wait Until Element Is Visible    css:.shopping_cart_badge
    ${badge}=    Get Text    css:.shopping_cart_badge
    Should Be Equal As Integers    ${badge}    ${count}

Add Multiple Products To Cart
    [Arguments]    @{products}
    FOR    ${product}    IN    @{products}
        Add Product To Cart By Name    ${product}
    END

Add Product To Cart By Name
    [Arguments]    ${product}
    ${locator}=    Set Variable    xpath=//div[contains(@class, 'inventory_item_name') and normalize-space(text())='${product}']/ancestor::div[@class='inventory_item']//button
    Wait Until Element Is Enabled    ${locator}
    Click Button    ${locator}

Proceed To Checkout
    Click Element    class=shopping_cart_link
    Wait Until Page Contains    Your Cart
    Wait Until Element Is Enabled    id=checkout
    Click Button    id=checkout

Fill Checkout Information
    [Arguments]    ${first}    ${last}    ${zip}
    Wait Until Element Is Visible    id=first-name
    Input Text    id=first-name    ${first}
    Input Text    id=last-name     ${last}
    Input Text    id=postal-code   ${zip}
    Wait Until Element Is Enabled    id=continue
    Click Button    id=continue

Verify Order Summary Is Visible
    Wait Until Page Contains    Checkout: Overview
    Element Should Be Visible    class=summary_total_label

Complete Order
    Wait Until Element Is Enabled    id=finish
    Click Button    id=finish

Verify Order Confirmation
    Wait Until Page Contains    Thank you for your order!
    Element Should Be Visible    class=complete-header

