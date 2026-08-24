*** Settings ***
Library           SeleniumLibrary
Library           Collections

*** Variables ***
${URL}          https://www.saucedemo.com
${BROWSER}      chrome
${USERNAME}     standard_user
${PASSWORD}     secret_sauce

*** Keywords ***
Open Browser With Safe Options
    [Documentation]    Opens browser with safe options to disable Chrome Password Manager
    &{prefs}=    Create Dictionary
    ...    credentials_enable_service=${False}
    ...    profile.password_manager_enabled=${False}
    ...    profile.password_manager_leak_detection=${False}
    Open Browser    ${URL}    ${BROWSER}    options=add_argument("--disable-notifications");add_experimental_option("prefs", ${prefs})
    Maximize Browser Window

Login As Standard User
    Open Browser With Safe Options
    Input Text           id:user-name        ${USERNAME}
    Input Password       id:password         ${PASSWORD}
    Wait Until Element Is Visible    id:login-button    timeout=10s
    Click Button         id:login-button
    Wait Until Page Contains Element    class:inventory_list    timeout=10s

Login As User
    [Arguments]    ${username}    ${password}
    [Documentation]    Opens browser and logs in with provided credentials
    Open Browser With Safe Options
    Input Text            id:user-name        ${username}
    Input Password        id:password         ${password}
    Wait Until Element Is Visible    id:login-button    timeout=10s
    Click Button          id:login-button

Add Product To Cart By Name
    [Arguments]    ${product_name}
    [Documentation]    Adds a product to the cart by product name
    ${locator}=    Set Variable    xpath://div[contains(@class,'inventory_item_name')][text()='${product_name}']/ancestor::div[@class='inventory_item']//button[contains(@id,'add-to-cart')]
    Wait Until Element Is Visible    ${locator}    timeout=10s
    Click Button    ${locator}

Verify Cart Has N Items
    [Arguments]    ${expected}
    Wait Until Element Is Visible    class:shopping_cart_badge    timeout=10s
    ${count}=    Get Text    class:shopping_cart_badge
    Should Be Equal As Numbers    ${count}    ${expected}

Go To Cart
    Wait Until Element Is Visible    class:shopping_cart_link    timeout=10s
    Click Element    class:shopping_cart_link

Proceed To Checkout
    Wait Until Element Is Visible    id:checkout    timeout=10s
    Click Button    id:checkout

Fill Checkout Information
    [Arguments]    ${first_name}    ${last_name}    ${postal_code}
    Wait Until Element Is Visible    id:first-name    timeout=10s
    Input Text      id:first-name    ${first_name}
    Input Text      id:last-name     ${last_name}
    Input Text      id:postal-code   ${postal_code}
    Click Button    id:continue