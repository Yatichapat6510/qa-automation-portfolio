*** Settings ***
Resource    ../resources/ui_keywords.robot

*** Test Cases ***
Debug Error
    Login As User    wrong_user    wrong_pass
    Element Should Be Visible    class:error-message-container
    Click Button    css:button.error-button
    Sleep    2s
    ${visible}=    Run Keyword And Return Status    Element Should Be Visible    class:error-message-container
    Log    Still visible: ${visible}
    ${attr}=    Get Element Attribute    class:error-message-container    class
    Log    class attr: ${attr}
    [Teardown]    Close Browser
