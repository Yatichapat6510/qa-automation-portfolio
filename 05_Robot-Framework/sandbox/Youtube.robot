*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}        https://www.google.com/webhp?hl=th
${BROWSER}    chrome
${SEARCH}     Youtube

*** Test Cases ***
TC-001 Search Youtube on Google
    Open Browser    ${URL}    ${BROWSER}
    ...    options=add_experimental_option("excludeSwitches", ["enable-automation"])
    Maximize Browser Window
    Wait Until Element Is Visible    name=q    15s
    Input Text    name=q    ${SEARCH}
    Press Keys    name=q    RETURN
    Sleep    10s
    [Teardown]    Close Browser

    
    