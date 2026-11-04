*** Settings ***
Documentation     ทดสอบการเพิ่มสินค้าลงตะกร้า: TC-MOB-005 (รายละเอียดใน docs/test-cases.md)
Resource          ../resources/common_android.resource
Resource          ../resources/test_data.resource
Resource          ../resources/pages/header_bar.resource
Resource          ../resources/pages/catalog_page.resource
Resource          ../resources/pages/product_detail_page.resource
Resource          ../resources/pages/cart_page.resource
Suite Setup       Open Android Application
Suite Teardown    Close Android Application
Test Setup        Restart App With Clean State

*** Test Cases ***
TC-MOB-005 Add Product With Quantity Two Updates Cart
    [Documentation]    [Positive / Edge] เพิ่ม Backpack 2 ชิ้น แล้ว badge และหน้า My Cart ต้องแสดงจำนวนและราคารวมถูกต้อง
    [Tags]    smoke    cart
    Open Product    ${BACKPACK}
    Product Detail Should Show    ${BACKPACK}
    Set Product Quantity    2
    Add Product To Cart
    # badge ต้องสะท้อนจำนวนชิ้นทันทีหลังกด Add To Cart
    Cart Badge Should Show    2
    Open Cart
    Cart Page Should Be Displayed
    Cart Should Contain Only    ${BACKPACK}
    # ราคารวม 29.99 x 2
    Cart Totals Should Be    2 Items    $ 59.98
