*** Settings ***
Resource          ../resources/common_android.resource
Suite Setup       Open Android Application
Suite Teardown    Close Android Application

*** Test Cases ***
App Should Open Successfully
    [Tags]    smoke
    Wait Until Page Contains Element    accessibility_id=test-PRODUCTS    10s