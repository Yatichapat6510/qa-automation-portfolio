*** Settings ***
Resource    ../../../resources/ui_keywords.robot

*** Keywords ***
Verify And Dismiss Error
    [Arguments]    ${expected_msg}
    # 1. ตรวจว่า error container visible
    Element Should Be Visible    class:error-message-container

    # 2. ตรวจ text ใน error message
    Element Should Contain    css:[data-test='error']    ${expected_msg}

    # 3. คลิกปุ่ม X ปิด error
    Click Button    css:button.error-button
    Wait Until Element Is Not Visible    css:[data-test='error']    timeout=10s

*** Test Cases ***
TC Verify And Dismiss Error Message
    Login As User    wrong_user    wrong_pass
    Verify And Dismiss Error    Username and password do not match
    [Teardown]    Close Browser
