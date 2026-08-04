*** Settings ***

Library            SeleniumLibrary
Suite Teardown     Close All Browsers


*** Variables ***

${URL}            https://www.saucedemo.com
${BROWSER}        chrome
${USERNAME}       standard_user
${PASSWORD}       secret_sauce


*** Test Cases ***

TC001 Locator Strategy Examples

    Open Browser        ${URL}    ${BROWSER}

    # By ID — ดีที่สุด ใช้ก่อนเสมอ
    Input Text        id:user-name    ${USERNAME}
    Input Password    id:password     ${PASSWORD}

    # By CSS
    Click Button      css:input[data-test='login-button']

    # By data-testid (best practice จาก dev)
    Click Element     css:[data-testid='checkout-btn']

    # By XPath — ใช้เมื่อ id/css ไม่มี
    Click Element     xpath://button[contains(text(),'Add to cart')]

    # By class — ตรวจสอบ error message
    Element Should Be Visible    class:error-message-container

    [Teardown]    Close Browser



