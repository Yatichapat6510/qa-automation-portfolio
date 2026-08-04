"""
📦 Page Object: ProductsPage
"""

from playwright.sync_api import Page


class ProductsPage:

    def __init__(self, page: Page):
        self.page = page

        # ── Locators ──────────────────────────────────
        self.product_items      = page.locator(".inventory_item")
        self.cart_badge         = page.locator(".shopping_cart_badge")
        self.cart_icon          = page.locator(".shopping_cart_link")
        self.first_add_btn      = page.locator(
            ".inventory_item:first-child [data-test*='add-to-cart']"
        )
        self.first_remove_btn   = page.locator(
            ".inventory_item:first-child [data-test*='remove']"
        )

    def add_first_item_to_cart(self):
        """เพิ่มสินค้าชิ้นแรกเข้า Cart"""
        self.first_add_btn.click()

    def remove_first_item_from_cart(self):
        """ลบสินค้าชิ้นแรกออกจาก Cart"""
        self.first_remove_btn.click()

    def get_cart_count(self) -> int:
        """ดูจำนวนสินค้าใน Cart Badge"""
        if self.cart_badge.is_visible():
            return int(self.cart_badge.text_content() or "0")
        return 0

    def go_to_cart(self):
        """คลิก Cart Icon ไปหน้า Cart"""
        self.cart_icon.click()
