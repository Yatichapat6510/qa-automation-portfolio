"""Component แถบด้านบน (เมนู + ตะกร้า) ที่แสดงอยู่ในทุกหน้าของ MainActivity"""

from appium.webdriver.common.appiumby import AppiumBy

from pages.base_page import BasePage, resource_id, scrollable_description


class HeaderBar(BasePage):
    MENU_BUTTON = (AppiumBy.ACCESSIBILITY_ID, "View menu")
    CART_BUTTON = (AppiumBy.ACCESSIBILITY_ID, "View cart")
    CART_BADGE = resource_id("cartTV")
    # เมนู Log In / Log Out อยู่ท้ายรายการ จึงใช้ locator ที่เลื่อนหาได้เอง
    # และระบุ menuRV เป็น container เพื่อไม่ให้ไปเลื่อนรายการสินค้าที่อยู่ด้านหลังเมนู
    LOGIN_MENU_ITEM = scrollable_description("Login Menu Item", container_id="menuRV")
    LOGOUT_MENU_ITEM = scrollable_description("Logout Menu Item", container_id="menuRV")

    def open_menu(self) -> None:
        self.tap(self.MENU_BUTTON)

    def go_to_login(self):
        # import ภายในเมธอดเพื่อตัดปัญหา circular import ระหว่าง page กับ header
        from pages.login_page import LoginPage

        self.open_menu()
        self.tap(self.LOGIN_MENU_ITEM)
        return LoginPage(self.driver).wait_until_loaded()

    def is_logged_in(self) -> bool:
        # สถานะ login ดูได้จากเมนู: ถ้า login แล้วจะแสดง "Log Out" แทน "Log In"
        self.open_menu()
        # ให้เวลาเท่า timeout ปกติ เพราะเมนูต้องเลื่อนลงหา item สุดท้ายและมี animation ตอนเปิด
        return self.is_visible(self.LOGOUT_MENU_ITEM, timeout=self.timeout)

    def cart_badge_count(self) -> int:
        # badge จะถูกซ่อน (GONE) เมื่อตะกร้าว่าง จึงต้องรอให้แสดงก่อนอ่านค่า
        return int(self.text_of(self.CART_BADGE))

    def open_cart(self):
        from pages.cart_page import CartPage

        self.tap(self.CART_BUTTON)
        return CartPage(self.driver).wait_until_loaded()
