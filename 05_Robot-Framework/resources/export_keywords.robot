# Create Keyword Library for Domain

*** Settings ***
Library        SeleniumLibrary
Resource       ./variables.robot


*** Keywords ***
# ── Login Keywords ──────────────────────────────────
Login To Saucedemo
    [Arguments]        ${username}=${STANDARD_USER}    ${password}=${PASSWORD}
    [Documentation]    Login using default (standard_user) or a custom user
    Go To                            ${BASE_URL}
    Wait Until Element Is Visible    id:user-name    ${TIMEOUT}
    Input Text                       id:user-name    ${username}
    Input Password                   id:password      ${password}
    Click Button                     id:login-button
    Wait Until Page Contains         Products         ${TIMEOUT}

Logout From Saucedemo
    Click Element                    id:react-burger-menu-btn
    Wait Until Element Is Visible    id:logout_sidebar_link    5s
    Click Element                    id:logout_sidebar_link
    Page Should Contain              Login


# ── Checkout Keywords ────────────────────────────────
Navigate To Cart
    Click Element                    class:shopping_cart_link
    Wait Until Page Contains         Your Cart    ${TIMEOUT}

Select Checkout Information
    [Arguments]    ${first_name}    ${last_name}    ${postal_code}
    Wait Until Element Is Visible    id:first-name    ${TIMEOUT}
    Input Text      id:first-name     ${first_name}
    Input Text      id:last-name      ${last_name}
    Input Text      id:postal-code    ${postal_code}

Click Continue Button
    Click Button    id:continue
    Wait Until Page Contains    Checkout: Overview    ${TIMEOUT}

Click Finish Button
    Click Button    id:finish
    Wait Until Page Contains    Thank you for your order!    ${TIMEOUT}

Verify Checkout Completed Successfully
    Wait Until Page Contains    Thank you for your order!    ${TIMEOUT}
    Element Should Be Visible    class:complete-header
