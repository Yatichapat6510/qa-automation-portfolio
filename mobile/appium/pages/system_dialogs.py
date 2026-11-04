"""จัดการ dialog ของระบบ Android ที่อาจเด้งทับแอประหว่างทดสอบ"""

from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from pages.base_page import BasePage, Locator


class SystemDialogs(BasePage):
    # Android 15 ขึ้นไปแสดง dialog "Android App Compatibility" กับแอปที่ยังไม่รองรับ memory page ขนาด 16 KB
    # dialog นี้เป็นของระบบ (package "android") ทำให้ UiAutomator2 มองไม่เห็นหน้าจอของแอปจนกว่าจะปิด
    COMPAT_DIALOG_TITLE = (
        AppiumBy.ANDROID_UIAUTOMATOR,
        'new UiSelector().resourceId("android:id/alertTitle").text("Android App Compatibility")',
    )
    # ปุ่ม "Don't Show Again" (positive button) ใช้ resource-id แทนข้อความ เพราะเครื่องหมาย ' อาจต่างกันตามรุ่น Android
    COMPAT_DIALOG_DONT_SHOW_AGAIN = (AppiumBy.ID, "android:id/button1")

    def wait_for_app_or_dismiss_dialog(self, app_ready_locator: Locator) -> None:
        """รอจนหน้าแอปพร้อม ถ้ามี dialog ความเข้ากันได้เด้งขึ้นก่อนให้ปิดแล้วรอต่อ"""
        WebDriverWait(self.driver, self.timeout).until(
            EC.any_of(
                EC.visibility_of_element_located(app_ready_locator),
                EC.visibility_of_element_located(self.COMPAT_DIALOG_TITLE),
            ),
            message=f"Neither app screen nor compatibility dialog appeared: {app_ready_locator}",
        )
        if self.is_visible(self.COMPAT_DIALOG_TITLE, timeout=1):
            # กด "Don't Show Again" เพื่อให้ระบบจำไว้ และไม่เด้งซ้ำในเทสถัดไป
            self.tap(self.COMPAT_DIALOG_DONT_SHOW_AGAIN)
        self.find_visible(app_ready_locator)
