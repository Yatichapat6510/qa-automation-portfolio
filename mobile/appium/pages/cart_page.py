"""Page Object ของหน้า My Cart"""

from typing import List

from appium.webdriver.common.appiumby import AppiumBy

from pages.base_page import resource_id
from pages.main_screen import MainScreen


class CartPage(MainScreen):
    CHECKOUT_BUTTON = (AppiumBy.ACCESSIBILITY_ID, "Confirms products for checkout")
    ITEM_TITLES = resource_id("titleTV")
    TOTAL_ITEMS = resource_id("itemsTV")
    TOTAL_PRICE = resource_id("totalPriceTV")

    def wait_until_loaded(self) -> "CartPage":
        # ปุ่ม Proceed To Checkout แสดงเฉพาะเมื่อมีสินค้าในตะกร้า
        self.find_visible(self.CHECKOUT_BUTTON)
        return self

    def item_titles(self) -> List[str]:
        self.find_visible(self.ITEM_TITLES)
        return [element.text for element in self.driver.find_elements(*self.ITEM_TITLES)]

    def total_items_text(self) -> str:
        return self.text_of(self.TOTAL_ITEMS)

    def total_price(self) -> float:
        # แอปแสดงราคาในรูปแบบ "$ 59.98" จึงตัดสัญลักษณ์สกุลเงินออกก่อนแปลงเป็นตัวเลข
        raw = self.text_of(self.TOTAL_PRICE)
        return float(raw.replace("$", "").replace(",", "").strip())
