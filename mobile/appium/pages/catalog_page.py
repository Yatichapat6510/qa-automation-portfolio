"""Page Object ของหน้า Products (หน้าแรกของแอป)"""

from appium.webdriver.common.appiumby import AppiumBy

from config.capabilities import APP_PACKAGE
from pages.main_screen import MainScreen


class CatalogPage(MainScreen):
    PRODUCT_LIST = (AppiumBy.ACCESSIBILITY_ID, "Displays all products of catalog")
    SORT_BUTTON = (AppiumBy.ACCESSIBILITY_ID, "Shows current sorting order and displays available sorting options")
    SORT_PRICE_ASCENDING = (AppiumBy.ACCESSIBILITY_ID, "Ascending order by price")
    PRODUCT_TITLES = (AppiumBy.ID, f"{APP_PACKAGE}:id/titleTV")

    def wait_until_loaded(self) -> "CatalogPage":
        self.find_visible(self.PRODUCT_LIST)
        return self

    def is_displayed(self) -> bool:
        return self.is_visible(self.PRODUCT_LIST)

    @staticmethod
    def _product_title(product_name: str):
        # เลื่อนรายการจนเห็นชื่อสินค้า (บางสินค้า เช่น Bolt T-Shirt อยู่ถัดจากสินค้าหลายสีจึงต้องเลื่อน)
        return (
            AppiumBy.ANDROID_UIAUTOMATOR,
            f'new UiScrollable(new UiSelector().resourceId("{APP_PACKAGE}:id/scrollView"))'
            f'.scrollIntoView(new UiSelector().resourceId("{APP_PACKAGE}:id/titleTV").text("{product_name}"))',
        )

    @staticmethod
    def _product_image(product_name: str):
        # แอปผูก click listener ไว้ที่รูปสินค้าเท่านั้น จึงหา title ตามชื่อก่อน
        # แล้วใช้ fromParent เลือกรูป (productIV) ที่อยู่ใน card เดียวกัน
        return (
            AppiumBy.ANDROID_UIAUTOMATOR,
            f'new UiSelector().resourceId("{APP_PACKAGE}:id/titleTV").text("{product_name}")'
            f'.fromParent(new UiSelector().resourceId("{APP_PACKAGE}:id/productIV"))',
        )

    def sort_by_price_ascending(self) -> "CatalogPage":
        """เรียงสินค้าตามราคาจากน้อยไปมาก แล้วรอจน dialog ปิดและรายการโหลดใหม่"""
        self.tap(self.SORT_BUTTON)
        self.tap(self.SORT_PRICE_ASCENDING)
        self.wait_until_gone(self.SORT_PRICE_ASCENDING)
        # สินค้าราคาถูกสุดคือ Onesie ($7.99) ใช้ยืนยันว่ารายการเรียงใหม่แล้วจริง
        self.wait.until(
            lambda d: [e.text for e in d.find_elements(*self.PRODUCT_TITLES)][:1] == ["Sauce Labs Onesie"],
            message="Product list was not re-sorted by price",
        )
        return self

    def open_product(self, product_name: str):
        from pages.product_detail_page import ProductDetailPage

        self.find_visible(self._product_title(product_name))
        self.tap(self._product_image(product_name))
        return ProductDetailPage(self.driver).wait_until_loaded(product_name)
