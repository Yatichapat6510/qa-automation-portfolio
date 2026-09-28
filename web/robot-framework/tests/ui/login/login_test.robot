*** Settings ***

Library            SeleniumLibrary
Suite Teardown     Close All Browsers

*** Variables ***

${URL}            http://www.saucedemo.com
${BROWSER}        chrome
${USERNAME}       standard_user
${PASSWORD}       secret_sauce

*** Test Cases ***

TC001 Valid Login Should Succeed

    [Tags]    smoke    login
    Open Browser        ${URL}        ${BROWSER}
    Input Text             id:user-name  ${USERNAME}
    Input Password         id:password   ${PASSWORD}
    Click Button           id:login-button
    Page Should Contain    Products
    [Teardown]    Teardown With Screenshot On Failure

TC002 Invalid Login Should Show Error
    [Tags]    regression    login
    Open Browser           ${URL}           ${BROWSER}
    Input Text             id:user-name  wrong_user
    Input Password         id:password   wrong_pass
    Click Button           id:login-button
    Element Should Be Visible    class:error-message-container
    [Teardown]    Teardown With Screenshot On Failure

TC003 Add Products And Verify Cart
    [Tags]    smoke
    Login As User        standard_user    secret_sauce
    Add Product To Cart  Sauce Labs Backpack
    Verify Cart Count    1
    [Teardown]           Teardown With Screenshot On Failure


TC004 Test Login
    Login As User    standard_user    secret_sauce
    Verify User Is On Products Page
    Close Browser

TC005 Test Cart
    Login As User    standard_user    secret_sauce
    Click Button    xpath://button[@id='add-to-cart-sauce-labs-backpack']
    Close Browser

TC006 Test Checkout
    Login As User    standard_user    secret_sauce
    Click Element   class:shopping_cart_link
    Close Browser

*** Keywords ***

Teardown With Screenshot On Failure
    Run Keyword If Test Failed    Capture Page Screenshot
    Close Browser

Login As User
    [Arguments]        ${username}     ${password}
    [Documentation]    Opens browser and logs in with provided credentials
    Open Browser       ${URL}          ${BROWSER}
    Maximize Browser Window
    Input Text        id:user-name     ${username}
    Input Password    id:password      ${password}
    Wait Until Element Is Visible    id:login-button    timeout=10s
    Click Button      id:login-button  

Verify User Is On Products Page
    [Documentation]    Verify login succeeded and user is on Products page
    Page Should Contain        Products
    Location Should Contain    inventory

Verify Error Message Contains
    [Arguments]    ${expected_text}
    Element Should Be Visible      class:error-message-container
    Element Should Contain         class:error-message-container    ${expected_text}

Add Product To Cart
    [Arguments]        ${product_name}
    [Documentation]    Add product to cart by searching for its name
    Click Button       xpath://div[text()='${product_name}']/ancestor::div[@class='inventory_item']//button

Verify Cart Count
    [Arguments]    ${expected_count}
    ${count}=      Get Text    class:shopping_cart_badge
    Should Be Equal As Numbers    ${count}    ${expected_count}