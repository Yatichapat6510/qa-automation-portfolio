# Write test cases for API covering all methods: GET, POST, PUT, DELETE
# Each test has a description and verifies expected responses
# Run Robot Framework to generate report and log files:
# robot --output output.xml --log log.html --report report.html "tests/api/test_2_4_API n Web.robot"

*** Settings ***
Library    RequestsLibrary
Library    Collections


*** Variables ***
${API_BASE}    https://jsonplaceholder.typicode.com


*** Test Cases ***
TC-01 Get User From API And Verify
    # Test GET to retrieve user id=1 and verify status 200 and correct name
    Create Session    api    ${API_BASE}
    ${resp}=    GET On Session    api    /users/1
    Should Be Equal As Numbers    ${resp.status_code}    200
    ${user}=    Set Variable    ${resp.json()}
    Log    User name: ${user}[name]
    Should Be Equal    ${user}[name]    Leanne Graham
    Dictionary Should Contain Key    ${user}    email
    Dictionary Should Contain Key    ${user}    phone

TC-02 Verify All Users List
    # Test GET to retrieve all users and verify status 200 and list is not empty
    Create Session    api    ${API_BASE}
    ${resp}=    GET On Session    api    /users
    Should Be Equal As Numbers    ${resp.status_code}    200
    ${users}=    Set Variable    ${resp.json()}
    Should Not Be Empty    ${users}
    Log    Retrieved users: ${users}

TC-03 Create User With POST
    # Test POST to create a new user and verify status 201 and returned data
    Create Session    api    ${API_BASE}
    ${payload}=    Create Dictionary    name=John Doe    username=johndoe    email=john.doe@example.com
    ${resp}=    POST On Session    api    /users    json=${payload}
    Should Be Equal As Numbers    ${resp.status_code}    201
    ${created}=    Set Variable    ${resp.json()}
    Log    Created user id: ${created}[id]
    Should Be Equal    ${created}[name]    John Doe
    Should Be Equal    ${created}[username]    johndoe
    Should Be Equal    ${created}[email]    john.doe@example.com

TC-04 Verify when input wrong data type for POST
    # Test POST with invalid data type and verify API accepts it with status 201
    Create Session    api    ${API_BASE}
    ${invalid_payload}=    Create Dictionary    name=12345    username=67890    email=not-an-email
    ${resp}=    POST On Session    api    /users    json=${invalid_payload}
    Should Be Equal As Numbers    ${resp.status_code}    201
    ${created}=    Set Variable    ${resp.json()}
    Should Be Equal    ${created}[name]    12345
    Should Be Equal    ${created}[username]    67890
    Should Be Equal    ${created}[email]    not-an-email
    Log    Verified invalid input data was accepted with status ${resp.status_code}

TC-05 Update User With PUT
    # Test PUT to update user id=1 and verify status 200 and updated data
    Create Session    api    ${API_BASE}
    ${update_payload}=    Create Dictionary    id=1    name=Leanne Graham Updated    username=Bret    email=leanne.graham@example.com
    ${resp}=    PUT On Session    api    /users/1    json=${update_payload}
    Should Be Equal As Numbers    ${resp.status_code}    200
    ${updated}=    Set Variable    ${resp.json()}
    Should Be Equal    ${updated}[name]    Leanne Graham Updated
    Should Be Equal    ${updated}[email]    leanne.graham@example.com

TC-06 Delete User With DELETE
    # Test DELETE to remove user id=1 and verify status 200 and response is an empty object
    Create Session    api    ${API_BASE}
    ${resp}=    DELETE On Session    api    /users/1
    Should Be Equal As Numbers    ${resp.status_code}    200
    ${deleted}=    Set Variable    ${resp.json()}
    Should Be Empty    ${deleted}
    Log    Verified delete response is empty

TC-07 Verify deleted user is still accessible on GET
    # Test GET after DELETE to verify the placeholder API still returns user data
    Create Session    api    ${API_BASE}
    ${delete_resp}=    DELETE On Session    api    /users/1
    Should Be Equal As Numbers    ${delete_resp.status_code}    200
    ${resp}=    GET On Session    api    /users/1
    Should Be Equal As Numbers    ${resp.status_code}    200
    ${user}=    Set Variable    ${resp.json()}
    Dictionary Should Contain Key    ${user}    id
    Should Be Equal As Numbers    ${user}[id]    1
    Log    Verified GET after delete returns ${resp.status_code}
