*** Settings ***
Resource          ../../../resources/browser.robot
Library    SeleniumLibrary

*** Test Cases ***
TC Modern Web Testing
    Open Chrome    https://www.saucedemo.com
    Input Text    id=user-name    standard_user
    Input Password    id=password    secret_sauce
    Click Button    id=login-button
    Wait Until Page Contains    Products    10s
    Capture Page Screenshot
    Close Browser