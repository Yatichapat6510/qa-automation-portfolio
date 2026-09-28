*** Settings ***
Documentation     Single place that opens Chrome so local runs and CI behave the same.
...               Local run:  robot -d results tests/
...               CI run:     robot -d results -v HEADLESS:True tests/
Library           SeleniumLibrary
Library           Collections

*** Variables ***
${BROWSER}        chrome
${HEADLESS}       ${False}

*** Keywords ***
Open Chrome
    [Documentation]    Open Chrome on ${target_url} with the password manager disabled.
    ...                When ${HEADLESS} is true, run headless with Linux-friendly flags
    ...                (no sandbox, no /dev/shm usage, fixed window size) for CI runners.
    [Arguments]    ${target_url}
    &{prefs}=    Create Dictionary
    ...    credentials_enable_service=${False}
    ...    profile.password_manager_enabled=${False}
    ...    profile.password_manager_leak_detection=${False}
    ${options}=    Set Variable    add_argument("--disable-notifications");add_experimental_option("prefs", ${prefs})
    ${headless}=    Convert To Boolean    ${HEADLESS}
    IF    ${headless}
        ${options}=    Catenate    SEPARATOR=;    ${options}
        ...    add_argument("--headless=new")
        ...    add_argument("--no-sandbox")
        ...    add_argument("--disable-dev-shm-usage")
        ...    add_argument("--disable-gpu")
        ...    add_argument("--window-size=1920,1080")
        Open Browser    ${target_url}    ${BROWSER}    options=${options}
    ELSE
        Open Browser    ${target_url}    ${BROWSER}    options=${options}
        Maximize Browser Window
    END
