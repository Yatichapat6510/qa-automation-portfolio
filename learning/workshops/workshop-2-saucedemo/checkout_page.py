"""
📦 Page Object: CheckoutPage
"""

from playwright.sync_api import Page


class CheckoutPage:

    def __init__(self, page: Page):
        self.page = page

        # ── Locators ──────────────────────────────────
        self.first_name_input = page.locator("#first-name")
        self.last_name_input  = page.locator("#last-name")
        self.zip_input        = page.locator("#postal-code")
        self.continue_button  = page.locator("#continue")
        self.finish_button    = page.locator("#finish")
        self.checkout_button  = page.locator("#checkout")
        self.error_message    = page.locator('[data-test="error"]')
        self.complete_header  = page.locator(".complete-header")

    def fill_info(self, first_name: str, last_name: str, zip_code: str):
        """
        กรอกข้อมูล Shipping แล้วกด Continue
        :param first_name: ชื่อ
        :param last_name:  นามสกุล
        :param zip_code:   รหัสไปรษณีย์
        """
        self.first_name_input.fill(first_name)
        self.last_name_input.fill(last_name)
        self.zip_input.fill(zip_code)
        self.continue_button.click()

    def finish(self):
        """กด Finish เพื่อยืนยันคำสั่งซื้อ"""
        self.finish_button.click()
