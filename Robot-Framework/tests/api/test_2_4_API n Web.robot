# เขียน test ที่ (1) เรียก GET https://jsonplaceholder.typicode.com/users/1 
# เพื่อดึงชื่อ user (2) verify ว่า response status 200 (3) ดึงค่า name 
# จาก JSON response — pattern นี้ใช้ verify ว่า API และ UI แสดงข้อมูลตรงกัน


*** Settings ***
Library    RequestsLibrary
Library    Collections


*** Variables ***
${API_BASE}    https://jsonplaceholder.typicode.com


*** Test Cases ***
TC Get User From API And Verify
    Create Session    api    ${API_BASE}
    ${resp}=    GET On Session    api    /users/1

    # Verify status code
    Should Be Equal As Numbers    ${resp.status_code}    200

    # ดึง name จาก JSON
    ${user}=    Set Variable    ${resp.json()}
    Log    User name: ${user}[name]
    Should Be Equal    ${user}[name]    Leanne Graham

    # Verify structure
    Dictionary Should Contain Key    ${user}    email
    Dictionary Should Contain Key    ${user}    phone