# Dynamic Content & AVAX -- element โหลดซ้ำ 

*** Settings ***
resource       ./variables.robot
resource       ./export_keywords.robot

*** Keywords ***
Wait For AJAX Content To Load
    [Arguments]    ${locator}    ${timeout}=${TIMEOUT}
    # รอ loading spinner หายก่อน
    Run Keyword And Ignore Error    
    ...    Wait Until Element Is Not Visible    class:loading-spinner     ${timeout}
    # แล้วรอ element ที่ต้องการ
    Wait Until Element Is Visible    ${locator}    ${timeout}

wait For Element To Load
    [Arguments]    ${table_id}    ${expevted_rows}
    [Documentation]    Wait for table to load with expected number of rows
       Wait Until Keyword Succeeds    30s    2s
    ...    Table Should Have Rows    ${table_id}    ${expected_rows}

Table Should Have Rows
    [Arguments]    ${table_id}    ${expected}
    ${rows}=    Get Element Count    css:#${table_id} tbody tr
    Should Be True    ${rows} >= ${expected}

