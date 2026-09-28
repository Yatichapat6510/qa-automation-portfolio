"""
📦 Page Object: LoginPage
=====================================================
เก็บ Locators และ Actions ของหน้า Login ไว้ที่เดียว
ถ้า UI เปลี่ยน แก้ที่ไฟล์นี้ที่เดียวพอ

Python Playwright ใช้ sync_api (แบบ synchronous)
ไม่ต้องใช้ async/await เหมาะกับมือใหม่
"""

from playwright.sync_api import Page


class LoginPage:
    URL = "https://www.saucedemo.com"

    def __init__(self, page: Page):
        self.page = page

        # ── Locators ──────────────────────────────────
        self.username_input = page.locator("#user-name")
        self.password_input = page.locator("#password")
        self.login_button   = page.locator("#login-button")
        self.error_message  = page.locator('[data-test="error"]')

    def goto(self):
        """เปิดหน้า Login"""
        self.page.goto(self.URL)

    def login(self, username: str, password: str):
        """
        กรอก credentials แล้วกด Login
        :param username: ชื่อผู้ใช้
        :param password: รหัสผ่าน
        """
        self.username_input.fill(username)
        self.password_input.fill(password)
        self.login_button.click()

    def get_error(self) -> str:
        """อ่านข้อความ Error Message"""
        return self.error_message.text_content() or ""
