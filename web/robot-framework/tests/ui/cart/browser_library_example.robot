*** Settings ***
Library    SeleniumLibrary

*** Test Cases ***
TC Modern Web Testing
    Open Browser    https://www.saucedemo.com    chrome
    Maximize Browser Window
    Input Text    id=user-name    standard_user
    Input Password    id=password    secret_sauce
    Click Button    id=login-button
    Wait Until Page Contains    Products    10s
    Capture Page Screenshot
    Close Browser