"""เคสที่ยืนยัน defect ที่รู้อยู่แล้วของแอป: TC-MOB-006 (ดู docs/examples/bug-reports/BUG-004)

ใช้ xfail แบบ strict: ถ้าบั๊กยังอยู่ ผลจะเป็น XFAIL และไม่ทำให้ CI แดง
ถ้าบั๊กถูกแก้ เคสจะกลายเป็น XPASS ซึ่ง strict=True จะนับเป็น fail เพื่อเตือนให้ถอด marker ออก
"""

import pytest

BOLT_TSHIRT = "Sauce Labs Bolt T-Shirt"


@pytest.mark.cart
@pytest.mark.known_defect
@pytest.mark.xfail(
    strict=True,
    # นับเป็น XFAIL เฉพาะเมื่อ assert ไม่ผ่าน (คือเจอบั๊กจริง) ถ้าล้มเพราะหา element ไม่เจอหรือ setup พัง ต้องแสดงเป็น fail
    raises=AssertionError,
    reason="BUG-004: app always adds 10 units of 'Sauce Labs Bolt T-Shirt' regardless of selected quantity",
)
def test_tc_mob_006_add_bolt_tshirt_adds_selected_quantity(app):
    # แอปแครชเมื่อแตะสินค้าลำดับที่ 7 ขึ้นไป (BUG-005) และ Bolt T-Shirt อยู่ลำดับท้ายๆ เมื่อเรียงตามชื่อ
    # จึงเรียงตามราคาก่อน ให้ Bolt T-Shirt ($15.99) ขึ้นมาอยู่ลำดับที่ 3 ซึ่งเปิดได้ปกติ
    product_page = app.sort_by_price_ascending().open_product(BOLT_TSHIRT)

    # ไม่ปรับจำนวน ค่าเริ่มต้นคือ 1 ชิ้น
    product_page.add_to_cart()

    assert product_page.header.cart_badge_count() == 1
