*** Settings ***
Library    SeleniumLibrary

*** Keywords ***
Login Once For All Tests
    [Documentation]    Placeholder for suite-level login setup
    Log    Login Once For All Tests placeholder executed

Reset To Home Before Each Test
    [Documentation]    Placeholder for per-test home reset
    Log    Reset To Home Before Each Test placeholder executed

Click With Retry
    [Arguments]    ${locator}    ${retries}=3    ${interval}=2s
    [Documentation]    Click element with retry when it is not ready
    Wait Until Keyword Succeeds    ${retries}    ${interval}
    ...    Click Element    ${locator}

Safe Navigate To
    [Arguments]    ${url}    ${expected_text}
    [Documentation]    Navigate with verification and retry if the page is not loaded
    Wait Until Keyword Succeeds    3x    3s    Navigate And Verify    ${url}    ${expected_text}

Navigate And Verify
    [Arguments]    ${url}    ${expected}
    Go To    ${url}
    Page Should Contain    ${expected}

Click Export Button
    [Documentation]    Application-specific export action
    Click Button    id:export-btn

Robust Export Trigger
    [Documentation]    Export with error recovery
    ${status}    ${msg}=    Run Keyword And Ignore Error
    ...    Click Export Button
    IF    '${status}' == 'FAIL'
        Capture Page Screenshot
        Log    Export failed: ${msg}    WARN
        Reload Page
        Wait Until Element Is Visible    id:export-btn    15s
        Click Export Button
    END