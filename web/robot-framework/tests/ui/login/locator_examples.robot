*** Settings ***

Resource          ../../../resources/browser.robot
Library            SeleniumLibrary
Suite Teardown     Close All Browsers


*** Variables ***

${URL}            https://www.saucedemo.com
${BROWSER}        chrome
${USERNAME}       standard_user
${PASSWORD}       secret_sauce


*** Test Cases ***

TC001 Locator Strategy Examples

    Open Chrome        ${URL}

    # By ID — best for login form fields
    Input Text        id:user-name    ${USERNAME}
    Input Password    id:password     ${PASSWORD}

    # By CSS selector
    Click Button      css:input[data-test='login-button']
    Wait Until Page Contains    Products    timeout=10s

    # By CSS on inventory page
    Click Button      css:button[data-test='add-to-cart-sauce-labs-backpack']
    Wait Until Element Is Visible    css:button[data-test='remove-sauce-labs-backpack']    timeout=10s

    # By XPath — find a matching product button on the inventory list
    Click Element     xpath://button[contains(@data-test, 'add-to-cart-sauce-labs-bike-light')]
    Wait Until Element Is Visible    xpath://button[contains(@data-test, 'remove-sauce-labs-bike-light')]    timeout=10s

    # By class — verify the products list is loaded
    Element Should Be Visible    class:inventory_list

    [Teardown]    Close Browser



