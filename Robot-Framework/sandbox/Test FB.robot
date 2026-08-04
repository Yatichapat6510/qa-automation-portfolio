*** Settings ***
Library     SeleniumLibrary
Library     Dialogs

*** Variables ***
${URL_facebook}         https://www.facebook.com/?locale=th_TH
${title_facebook}       Facebook - เข้าสู่ระบบหรือสมัครใช้งาน
${input_username}       //*[@id="email"]
${input_password}       //*[@id="pass"]
${btn_login}            //*[@name="login"]
${txt_not__me}          //*[@id="not_me_link"]
${txt_massage}          //div//textarea[@name="xhpc_message"]
${captcha_element}      //iframe[contains(@src, "captcha")]   # ตัวอย่าง xpath ของ CAPTCHA
${username_fail}        Chanuntda@hotmail.com
${password_fail}        chanuntdakanta.134466510
${username_success}     Chanuntda@hotmail.com
${password_success}     chanuntdakanta.134466510

*** Keywords ***
Verify Facebook Page
  [Arguments]      ${title}
  Title Should Be  ${title}

Input Username and Password
  [Arguments]  ${Xpath_user}  ${Xpath_pass}  ${username}  ${password}
  Element Should Be Visible  ${Xpath_user}
  Element Should Be Visible  ${Xpath_pass}
  Input Text  ${Xpath_user}  ${username}
  Input Text  ${Xpath_pass}  ${password}

Click Login Button
  [Arguments]  ${Xpath_btn}
  Element Should Be Visible  ${Xpath_btn}
  Click Element  ${Xpath_btn}

Check For CAPTCHA
  Run Keyword And Ignore Error  Wait Until Element Is Visible  ${captcha_element}  5s
  ${captcha_present}=  Run Keyword And Return Status  Element Should Be Visible  ${captcha_element}
  Run Keyword If  ${captcha_present}  Handle CAPTCHA

Handle CAPTCHA
  Log  ⚠ CAPTCHA detected. Please complete it manually in the browser. Test is paused...
  Pause Execution  CAPTCHA detected. Please solve it manually in the opened browser.

Verify Login Fail
  [Arguments]  ${Xpath_txt}
  Element Should Be Visible  ${Xpath_txt}

Verify Login Success
  [Arguments]  ${Xpath_txt}
  Element Should Be Visible  ${Xpath_txt}

*** Test Cases ***
Login Facebook - Fail
  [Tags]  Fail
  Open Browser  ${URL_facebook}    chrome
  Input Username and Password  ${input_username}  ${input_password}  ${username_fail}  ${password_fail}
  Click Login Button  ${btn_login}
  Check For CAPTCHA
  Sleep  5s
  Close Browser

Login Facebook - Success
  [Tags]  Success
  Open Browser  ${URL_facebook}    chrome
  Input Username and Password  ${input_username}  ${input_password}  ${username_success}  ${password_success}
  Click Login Button  ${btn_login}
  Check For CAPTCHA
  Sleep  5s
  Verify Login Success  ${txt_massage}
  Close Browser
