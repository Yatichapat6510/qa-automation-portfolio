*** Settings ***
Library           SeleniumLibrary
Library           ${CURDIR}/../../../test_data/libraries/SauceDemoHelper.py
Resource          ${CURDIR}/../../../resources/ui_keywords.robot
Test Teardown     Close Browser

*** Test Cases ***
TC Cart Total Should Match Calculated Tax
    [Tags]    integration    pricing
    Login As Standard User
    Add Product To Cart By Name    Sauce Labs Backpack
    Add Product To Cart By Name    Sauce Labs Bike Light
    Click Element    class:shopping_cart_link
    Click Button     id:checkout
    Fill Checkout Information    John    Doe    90210
    ${displayed}=    Get Text    class:summary_total_label
    ${expected}=    Calculate Expected Total With Tax    29.99    9.99    # Custom keyword!
    Should Contain    ${displayed}    ${{ str(${expected}) }}

TC Each Test User Should Have Documented Behavior
    [Tags]    regression    users
    FOR    ${user}    IN    standard_user    locked_out_user    problem_user    error_user
        Username Should Be Valid SauceDemo User    ${user}    # Custom keyword!
        ${behavior}=    Get User Expected Behavior    ${user}
        Log    ${user} → ${behavior}
    END
