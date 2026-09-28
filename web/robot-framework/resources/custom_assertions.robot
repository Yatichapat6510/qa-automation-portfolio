Library    SeleniumLibrary
Library    Collections

*** Keywords ***
Export Count Should Be
    [Arguments]    ${expected}
    ${actual}=    Get Element Count    css:.export-row
    Run Keyword If    ${actual} != ${expected}
    ...    Fail    Expected ${expected} export rows but found ${actual}

Page Should Load Within
    [Arguments]    ${seconds}    ${content}
    ${start}=    Get Time    epoch
    Wait Until Page Contains    ${content}    timeout=${seconds}s
    ${end}=    Get Time    epoch
    ${elapsed}=    Evaluate    ${end} - ${start}
    Should Be True    ${elapsed} <= ${seconds}
    ...    Page took ${elapsed}s to load (max: ${seconds}s)

API Response Should Be Valid
    [Arguments]    ${response}    ${expected_status}=200
    Should Be Equal As Numbers    ${response.status_code}    ${expected_status}
    ...    API returned ${response.status_code} instead of ${expected_status}
    Dictionary Should Contain Key    ${response.json()}    data
    ...    API response missing 'data' field