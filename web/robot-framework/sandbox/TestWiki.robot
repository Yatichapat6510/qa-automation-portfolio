*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}        https://th.wikipedia.org/wiki/หน้าหลัก
${SEARCH}     Robot Framework

*** Test Cases ***
TC-001 Search on Wikipedia
    Open Browser    ${URL}    chrome
    Maximize Browser Window
    Wait Until Element Is Visible    id=searchInput    15s
    Input Text    id=searchInput    ${SEARCH}
    Press Keys    id=searchInput    RETURN
    Wait Until Element Is Visible    id=firstHeading    15s
    Sleep    3s
    [Teardown]    Close Browser
    