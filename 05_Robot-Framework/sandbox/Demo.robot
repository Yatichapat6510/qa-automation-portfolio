*** Settings ***

Library            SeleniumLibrary
Suite Setup        Open Browser    ${BASE_URL}    ${BROWSER}
Suite Teardown     Close Browser
Documentation      Test suite for login flow

# Library           SeleniumLibrary
# Library           RequestsLibrary
# Resource          ../resources/common_keywords.robot
# Suite Setup       Open Browser Setup
# Suite Teardown    Close Browser
# Documentation     Test suite สำหรับ login flow

*** Variables ***

# --- Scalar: เก็บค่าเดี่ยว ---
${BASE_URL}            https://www.saucedemo.com
${BROWSER}             chrome
${PASSWORD}            secret_sauce
# --- List: เก็บหลายค่า ---
@{VALID_USERS}         standard_user    locked_out_user    problem_user    performance_glitch_user    error_user    visual_user
# --- Dictionary: key-value pairs ---
&{USER_DATA}           username=standard_user    password=secret_sauce



*** Test Cases ***

Login With Valid Credentials
    [Documentation]        Verify user can login with valid credentials
    [Tags]                 smoke login
    Login As User          ${USER_DATA.username}    ${USER_DATA.password}
    Dashboard Should Be Visible



*** Keywords ***

Login As User
    [Arguments]        ${username}    ${password}
    Go To              ${BASE_URL}
    Input Text         id=user-name    ${username}
    Input Text         id=password     ${password}
    Click Button       id=login-button

Dashboard Should Be Visible
    Element Should Be Visible    class=inventory_list

