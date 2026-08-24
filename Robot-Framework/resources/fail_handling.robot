*** Settings ***
Library    OperatingSystem
Library    SeleniumLibrary
Test Teardown    Capture Evidence On Failure

*** Variables ***
${SCREENSHOT_DIR}    ${CURDIR}/artifacts/screenshots

*** Keywords ***
Capture Evidence On Failure
    [Documentation]    Collect evidence when a test fails.
    Run Keyword If Test Failed    Capture Full Evidence

Capture Full Evidence
    [Documentation]    Save screenshot, page source, and browser logs for debugging.
    Create Directory    ${SCREENSHOT_DIR}

    # Screenshot
    Capture Page Screenshot    ${SCREENSHOT_DIR}/${TEST_NAME}.png

    # HTML source
    ${source}=    Get Source
    Create File    ${SCREENSHOT_DIR}/${TEST_NAME}.html    ${source}

    # Browser console logs
    ${logs}=    Get Browser Logs
    Log    Browser console:\n${logs}    WARN