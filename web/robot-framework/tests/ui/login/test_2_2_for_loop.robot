# # saucedemo has multiple user types — write test that loops through all users
# # and verify that each user has different expected behavior
# # (standard → login success, locked → error, wrong → error)


# *** Settings ***
# Resource    ../../../resources/ui_keywords.robot


# *** Variables ***
# @{VALID_USERS}        standard_user    performance_glitch_user
# @{INVALID_USERS}      locked_out_user  wrong_user


# *** Keywords ***
# Login As User
#     [Arguments]    ${username}    ${password}
#     Input Text        id:user-name    ${username}
#     Input Password     id:password     ${password}
#     Click Button        id:login-button


# *** Test Cases ***

# TC Valid Users Can Login
#     FOR    ${user}    IN    @{VALID_USERS}
#         Open Browser          https://www.saucedemo.com    chrome
#         Login As User         ${user}    secret_sauce
#         Page Should Contain   Products
#         Close Browser
#     END
#     [Teardown]    Close All Browsers

# TC Invalid Users Cannot Login
#     FOR    ${user}    IN    @{INVALID_USERS}
#         Open Browser          https://www.saucedemo.com    chrome
#         Login As User         ${user}    secret_sauce
#         Element Should Be Visible    class:error-message-container
#         Close Browser
#     END
#     [Teardown]    Close All Browsers



*** Settings ***
Resource    ../../../resources/ui_keywords.robot


*** Variables ***
@{VALID_USERS}        standard_user    performance_glitch_user
@{INVALID_USERS}      locked_out_user  wrong_user


*** Test Cases ***

TC Valid Users Can Login
    FOR    ${user}    IN    @{VALID_USERS}
        Login As User         ${user}    secret_sauce
        Wait Until Page Contains    Products    timeout=30s
        Close Browser
    END
    [Teardown]    Close All Browsers

TC Invalid Users Cannot Login
    FOR    ${user}    IN    @{INVALID_USERS}
        Login As User         ${user}    secret_sauce
        Wait Until Element Is Visible    class:error-message-container    timeout=15s
        Close Browser
    END
    [Teardown]    Close All Browsers