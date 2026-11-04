"""Page Object ของหน้ารายละเอียดสินค้า"""

from appium.webdriver.common.appiumby import AppiumBy

from pages.base_page import resource_id, scrollable_description
from pages.main_screen import MainScreen


class ProductDetailPage(MainScreen):
    PRODUCT_TITLE = resource_id("productTV")
    QUANTITY = resource_id("noTV")
    INCREASE_QUANTITY = (AppiumBy.ACCESSIBILITY_ID, "Increase item quantity")
    # ปุ่ม Add To Cart อยู่ใต้รูปและตัวเลือกสี อาจล้นจอบนอุปกรณ์จอเล็ก
    ADD_TO_CART = scrollable_description("Tap to add product to cart")

    def wait_until_loaded(self, product_name: str) -> "ProductDetailPage":
        # ยืนยันว่าเปิดสินค้าถูกตัว ไม่ใช่แค่เปิดหน้ารายละเอียดได้
        self.wait_for_text(self.PRODUCT_TITLE, product_name)
        return self

    def quantity(self) -> int:
        return int(self.text_of(self.QUANTITY))

    def set_quantity(self, target: int) -> None:
        if target < 1:
            raise ValueError("Quantity must be at least 1")
        # เลื่อนให้แถวปุ่มจำนวน/Add To Cart อยู่ในจอก่อน
        self.find_visible(self.ADD_TO_CART)
        current = self.quantity()
        while current < target:
            self.tap(self.INCREASE_QUANTITY)
            # รอให้ตัวเลขอัปเดตทีละขั้น ป้องกันการกดซ้อนก่อน UI เปลี่ยน
            self.wait_for_text(self.QUANTITY, str(current + 1))
            current += 1

    def add_to_cart(self) -> None:
        self.tap(self.ADD_TO_CART)
