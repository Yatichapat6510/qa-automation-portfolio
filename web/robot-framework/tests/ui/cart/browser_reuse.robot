*** Settings ***
Resource          ../../../resources/ui_keywords.robot
Library           SeleniumLibrary
Suite Setup       Login Once For All Tests
Suite Teardown    Close All Browsers
Test Setup        Reset To Home Before Each Test

*** Keywords ***
Login Once For All Tests
    [Documentation]    Open browser and log in once for the whole suite.
    Login As Standard User

Reset To Home Before Each Test
    [Documentation]    Go back to the home page instead of logging in each time.
    Go To    ${URL}/inventory.html
    Wait Until Page Contains    Products    10s

*** Test Cases ***
TC Browser Reuse Keeps Logged In Session
    [Tags]    smoke    reuse
    Add Product To Cart By Name    Sauce Labs Backpack
    Go To Cart
    Verify Cart Has N Items    1

TC Browser Reuse Allows Multiple Tests In One Session
    [Tags]    smoke    reuse
    Add Product To Cart By Name    Sauce Labs Bike Light
    Go To Cart
    Verify Cart Has N Items    2