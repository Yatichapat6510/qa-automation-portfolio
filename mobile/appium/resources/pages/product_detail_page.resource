*** Settings ***
Documentation     Page Object ของหน้ารายละเอียดสินค้า
Resource          ../common_android.resource

*** Variables ***
${PRODUCT_TITLE}               id=${APP_PACKAGE}:id/productTV
${QUANTITY_LABEL}              id=${APP_PACKAGE}:id/noTV
${INCREASE_QUANTITY_BUTTON}    accessibility_id=Increase item quantity
# ปุ่ม Add To Cart อยู่ใต้รูปและตัวเลือกสี อาจล้นจอบนอุปกรณ์จอเล็ก จึงใช้ locator ที่เลื่อนหาเอง
${ADD_TO_CART_BUTTON}          android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("Tap to add product to cart"))

*** Keywords ***
Product Detail Should Show
    [Documentation]    ยืนยันว่าเปิดสินค้าถูกตัว ไม่ใช่แค่เปิดหน้ารายละเอียดได้
    ...    หน้า Products ก็มี element id productTV (หัวข้อ "Products") เหมือนกัน ระหว่างเปลี่ยนหน้าอาจเจอของหน้าเก่า
    ...    แล้ว element กลายเป็น stale จึงตรวจข้อความแบบวนซ้ำจนตรง (เทียบเท่า text_to_be_present_in_element ฝั่ง pytest)
    [Arguments]    ${product_name}
    Wait Until Keyword Succeeds    ${TIMEOUT}    0.5s
    ...    Element Text Should Be    ${PRODUCT_TITLE}    ${product_name}

Set Product Quantity
    [Documentation]    กดปุ่ม + จนจำนวนเท่ากับค่าที่ต้องการ โดยรอตัวเลขอัปเดตทีละขั้น
    [Arguments]    ${target}
    Wait Until Element Is Visible    ${ADD_TO_CART_BUTTON}    ${TIMEOUT}
    ${current}=    Get Text    ${QUANTITY_LABEL}
    ${current}=    Convert To Integer    ${current}
    WHILE    ${current} < ${target}    limit=20
        Click Element    ${INCREASE_QUANTITY_BUTTON}
        ${current}=    Evaluate    ${current} + 1
        # Element Text Should Be เทียบแบบ string จึงต้องแปลงตัวเลขก่อน ไม่อย่างนั้น 2 กับ "2" จะไม่เท่ากัน
        ${expected_text}=    Convert To String    ${current}
        # ป้องกันการกดซ้อนก่อน UI เปลี่ยน
        Wait Until Keyword Succeeds    5s    0.5s
        ...    Element Text Should Be    ${QUANTITY_LABEL}    ${expected_text}
    END

Add Product To Cart
    Wait Until Element Is Visible    ${ADD_TO_CART_BUTTON}    ${TIMEOUT}
    Click Element    ${ADD_TO_CART_BUTTON}
