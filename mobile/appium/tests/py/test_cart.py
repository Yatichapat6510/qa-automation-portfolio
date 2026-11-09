"""ทดสอบการเพิ่มสินค้าลงตะกร้า: TC-MOB-005 (ดู docs/test-cases.md)"""

import pytest

PRODUCT_NAME = "Sauce Labs Backpack"
UNIT_PRICE = 29.99
QUANTITY = 2


@pytest.mark.smoke
@pytest.mark.cart
def test_tc_mob_005_add_product_with_quantity_updates_cart(app):
    product_page = app.open_product(PRODUCT_NAME)

    product_page.set_quantity(QUANTITY)
    product_page.add_to_cart()

    # badge บนไอคอนตะกร้าต้องสะท้อนจำนวนชิ้นทันทีหลังกด Add To Cart
    assert product_page.header.cart_badge_count() == QUANTITY

    cart_page = product_page.header.open_cart()

    assert cart_page.item_titles() == [PRODUCT_NAME]
    assert cart_page.total_items_text() == f"{QUANTITY} Items"
    # ใช้ approx เพราะราคาเป็นเลขทศนิยม เลี่ยงปัญหาความคลาดเคลื่อนของ float
    assert cart_page.total_price() == pytest.approx(UNIT_PRICE * QUANTITY)
