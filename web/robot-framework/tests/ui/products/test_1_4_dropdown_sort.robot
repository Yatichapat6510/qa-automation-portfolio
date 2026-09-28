# *** Settings ***
# Resource           ../../../resources/ui_keywords.robot
# Suite Teardown      Close All Browsers

# *** Test Cases ***

# TC001 Locator Strategy Examples

#     Open Browser With Safe Options

#     # By ID — ดีที่สุด ใช้ก่อนเสมอ
#     Input Text        id:user-name    ${USERNAME}
#     Input Password    id:password     ${PASSWORD}

#     # By CSS
#     Click Button      css:input[data-test='login-button']

#     # By data-testid (best practice จาก dev)
#     Click Element     css:[data-testid='checkout-btn']

#     # By XPath — ใช้เมื่อ id/css ไม่มี
#     Click Element     xpath://button[contains(text(),'Add to cart')]

#     # By class — ตรวจสอบ error message
#     Element Should Be Visible    class:error-message-container

#     [Teardown]    Close Browser


*** Settings ***
Resource           ../../../resources/ui_keywords.robot
Suite Teardown      Close All Browsers

*** Test Cases ***

TC001 Locator Strategy Examples On Inventory Page
    [Documentation]    สาธิต locator strategy หลายแบบ บนหน้า Products หลัง login สำเร็จ
    Open Browser With Safe Options

    # By ID — ดีที่สุด ใช้ก่อนเสมอ
    Input Text        id:user-name    ${USERNAME}
    Input Password    id:password     ${PASSWORD}

    # By CSS
    Click Button      css:input[data-test='login-button']

    # By XPath — ใช้เมื่อ id/css ไม่มี
    Wait Until Element Is Visible    xpath://button[contains(text(),'Add to cart')]    timeout=20s
    Click Element     xpath://button[contains(text(),'Add to cart')]

    [Teardown]    Close Browser

TC002 Verify Error Message Locator On Failed Login
    [Documentation]    สาธิตการหา error message — ต้อง login ผิดถึงจะมี element นี้จริง
    Open Browser With Safe Options
    Input Text        id:user-name    locked_out_user
    Input Password    id:password     secret_sauce
    Click Button      css:input[data-test='login-button']

    # By class — ตรวจสอบ error message
    Element Should Be Visible    class:error-message-container

    [Teardown]    Close Browser