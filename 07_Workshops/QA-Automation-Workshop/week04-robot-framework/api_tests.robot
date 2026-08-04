*** Settings ***
Documentation     QA Workshop - Robot Framework API Tests
...               ทดสอบ Demo API ด้วย Robot Framework + RequestsLibrary
Library           RequestsLibrary
Library           Collections
Library           String

Suite Setup       Create API Session
Suite Teardown    Delete All Sessions

*** Variables ***
${BASE_URL}       http://localhost:5000
${TOKEN}          test-token-123
${AUTH_HEADER}    Bearer ${TOKEN}

*** Keywords ***
Create API Session
    [Documentation]    สร้าง HTTP Session สำหรับใช้ใน test ทุกตัว
    Create Session    api    ${BASE_URL}    verify=False

Get Auth Headers
    [Documentation]    คืน dictionary ของ Auth headers
    ${headers}=    Create Dictionary
    ...    Authorization=Bearer ${TOKEN}
    ...    Content-Type=application/json
    RETURN    ${headers}

Verify Status Code
    [Arguments]    ${response}    ${expected}
    [Documentation]    ตรวจสอบ status code
    Should Be Equal As Integers    ${response.status_code}    ${expected}
    ...    msg=Expected ${expected} but got ${response.status_code}

Verify Json Field
    [Arguments]    ${response}    ${field}    ${expected}
    [Documentation]    ตรวจสอบ field ใน JSON response
    ${body}=    Set Variable    ${response.json()}
    Should Be Equal    ${body}[${field}]    ${expected}

*** Test Cases ***

# ========== HEALTH CHECK ==========

TC-001 Health Check Returns 200
    [Documentation]    ทดสอบ health endpoint คืน 200
    [Tags]    smoke    health
    ${res}=    GET On Session    api    /health
    Verify Status Code    ${res}    200
    ${body}=    Set Variable    ${res.json()}
    Should Be Equal    ${body}[status]    ok
    Log    Health check passed: ${body}

TC-002 Health Has Version Field
    [Documentation]    ทดสอบว่า health response มี version
    [Tags]    smoke    health
    ${res}=    GET On Session    api    /health
    ${body}=    Set Variable    ${res.json()}
    Dictionary Should Contain Key    ${body}    version

# ========== AUTH ==========

TC-010 Login Success
    [Documentation]    ทดสอบ login ด้วย credentials ที่ถูกต้อง
    [Tags]    smoke    auth
    ${payload}=    Create Dictionary    username=admin    password=password123
    ${res}=    POST On Session    api    /api/login    json=${payload}
    Verify Status Code    ${res}    200
    ${body}=    Set Variable    ${res.json()}
    Should Be True    ${body}[success]
    Should Not Be Empty    ${body}[token]
    Log    Token received: ${body}[token]

TC-011 Login Wrong Password Returns 401
    [Documentation]    ทดสอบ login รหัสผ่านผิด → 401
    [Tags]    regression    auth    negative
    ${payload}=    Create Dictionary    username=admin    password=wrongpassword
    ${res}=    POST On Session    api    /api/login    json=${payload}
    ...    expected_status=any
    Verify Status Code    ${res}    401

TC-012 Access Without Token Returns 401
    [Documentation]    ทดสอบเรียก protected endpoint โดยไม่มี token → 401
    [Tags]    regression    auth    negative
    ${res}=    GET On Session    api    /api/users    expected_status=any
    Verify Status Code    ${res}    401

# ========== USERS ==========

TC-020 Get All Users
    [Documentation]    ทดสอบดูรายการ users ทั้งหมด
    [Tags]    smoke    users
    ${headers}=    Get Auth Headers
    ${res}=    GET On Session    api    /api/users    headers=${headers}
    Verify Status Code    ${res}    200
    ${body}=    Set Variable    ${res.json()}
    Dictionary Should Contain Key    ${body}    data
    Dictionary Should Contain Key    ${body}    total
    Should Be True    ${body}[total] > 0

TC-021 Get User By ID
    [Documentation]    ทดสอบดู user เดี่ยวด้วย ID
    [Tags]    smoke    users
    ${headers}=    Get Auth Headers
    ${res}=    GET On Session    api    /api/users/1    headers=${headers}
    Verify Status Code    ${res}    200
    ${body}=    Set Variable    ${res.json()}
    Should Be Equal    ${body}[id]    1
    Dictionary Should Contain Key    ${body}    name
    Dictionary Should Contain Key    ${body}    email

TC-022 Get User Not Found Returns 404
    [Documentation]    ทดสอบดู user ที่ไม่มีอยู่ → 404
    [Tags]    regression    users    negative
    ${headers}=    Get Auth Headers
    ${res}=    GET On Session    api    /api/users/9999    headers=${headers}
    ...    expected_status=any
    Verify Status Code    ${res}    404

TC-023 Create User Success
    [Documentation]    ทดสอบสร้าง user ใหม่
    [Tags]    smoke    users
    ${headers}=    Get Auth Headers
    ${email}=    Generate Random String    8    [LOWER]
    ${payload}=    Create Dictionary
    ...    name=Robot Test User
    ...    email=${email}@robot-test.com
    ${res}=    POST On Session    api    /api/users    json=${payload}    headers=${headers}
    Verify Status Code    ${res}    201
    ${body}=    Set Variable    ${res.json()}
    Dictionary Should Contain Key    ${body}    id
    Should Be Equal    ${body}[name]    Robot Test User

TC-024 Create User Missing Name Returns 422
    [Documentation]    ทดสอบสร้าง user ไม่มี name → 422
    [Tags]    regression    users    negative
    ${headers}=    Get Auth Headers
    ${payload}=    Create Dictionary    email=no-name@test.com
    ${res}=    POST On Session    api    /api/users    json=${payload}    headers=${headers}
    ...    expected_status=any
    Verify Status Code    ${res}    422

# ========== PRODUCTS ==========

TC-030 Get Products No Auth Required
    [Documentation]    ทดสอบ /api/products ไม่ต้องการ token
    [Tags]    smoke    products
    ${res}=    GET On Session    api    /api/products
    Verify Status Code    ${res}    200
    ${body}=    Set Variable    ${res.json()}
    Should Be True    ${body}[total] > 0

TC-031 Filter Products By Category
    [Documentation]    ทดสอบ filter products ตาม category
    [Tags]    regression    products
    ${res}=    GET On Session    api    /api/products    params=category=Electronics
    Verify Status Code    ${res}    200
    ${body}=    Set Variable    ${res.json()}
    FOR    ${product}    IN    @{body}[data]
        Should Be Equal    ${product}[category]    Electronics
    END

# ========== SEARCH ==========

TC-040 Search Products Found
    [Documentation]    ทดสอบค้นหาที่มีผลลัพธ์
    [Tags]    smoke    search
    ${res}=    GET On Session    api    /api/search    params=q=laptop
    Verify Status Code    ${res}    200
    ${body}=    Set Variable    ${res.json()}
    Should Be True    ${body}[count] > 0

TC-041 Search Missing Query Returns 400
    [Documentation]    ทดสอบค้นหาโดยไม่มี q parameter → 400
    [Tags]    regression    search    negative
    ${res}=    GET On Session    api    /api/search    expected_status=any
    Verify Status Code    ${res}    400

# ========== DATA DRIVEN ==========

TC-050 Get Multiple Users Data Driven
    [Documentation]    ทดสอบดู user หลายคนด้วย Template
    [Tags]    regression    data-driven
    [Template]    Verify User Exists
    1    Alice    alice@example.com
    2    Bob      bob@example.com
    3    Carol    carol@example.com

*** Keywords ***
Verify User Exists
    [Arguments]    ${user_id}    ${expected_name}    ${expected_email}
    [Documentation]    Template keyword สำหรับ data-driven test
    ${headers}=    Get Auth Headers
    ${res}=    GET On Session    api    /api/users/${user_id}    headers=${headers}
    Verify Status Code    ${res}    200
    ${body}=    Set Variable    ${res.json()}
    Should Be Equal    ${body}[name]     ${expected_name}
    Should Be Equal    ${body}[email]    ${expected_email}
