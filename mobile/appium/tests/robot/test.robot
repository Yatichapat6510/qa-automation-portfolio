*** Settings ***
Resource          ../../resources/common_android.resource
Suite Setup       Open Android Application
Suite Teardown    Close Android Application

*** Test Cases ***
App Should Open Successfully
    [Tags]    smoke
    # ใช้ content-desc ของรายการสินค้าที่มีอยู่จริงในแอปเวอร์ชันนี้
    Wait Until Page Contains Element    accessibility_id=Displays all products of catalog    15s
