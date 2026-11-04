"""คลาสแม่ของทุก Page Object: รวม explicit wait และ action พื้นฐานไว้ที่เดียว"""

from typing import Optional, Tuple

from appium.webdriver.common.appiumby import AppiumBy
from appium.webdriver.webdriver import WebDriver
from appium.webdriver.webelement import WebElement
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from config.capabilities import APP_PACKAGE

Locator = Tuple[str, str]


def resource_id(view_id: str) -> Locator:
    """สร้าง locator แบบ resource-id ใช้กับ element ที่แอปไม่ได้กำหนด content-desc ไว้"""
    return AppiumBy.ID, f"{APP_PACKAGE}:id/{view_id}"


def scrollable_description(description: str, container_id: Optional[str] = None) -> Locator:
    """สร้าง locator ที่เลื่อนหน้าจอหา element จาก content-desc ให้อัตโนมัติ

    ใช้กับ element ที่อาจอยู่นอกจอบนอุปกรณ์จอเล็ก
    ถ้า element มองเห็นอยู่แล้ว UiScrollable จะคืนค่าทันทีโดยไม่เลื่อน
    ระบุ container_id เมื่อหน้าจอมีหลายส่วนที่เลื่อนได้ (เช่น เมนูที่เปิดทับรายการสินค้า)
    """
    container = (
        f'new UiSelector().resourceId("{APP_PACKAGE}:id/{container_id}")'
        if container_id
        else "new UiSelector().scrollable(true)"
    )
    return (
        AppiumBy.ANDROID_UIAUTOMATOR,
        f"new UiScrollable({container})"
        f'.scrollIntoView(new UiSelector().description("{description}"))',
    )


class BasePage:
    DEFAULT_TIMEOUT = 15

    def __init__(self, driver: WebDriver, timeout: int = DEFAULT_TIMEOUT) -> None:
        self.driver = driver
        self.timeout = timeout
        self.wait = WebDriverWait(driver, timeout)

    def find_visible(self, locator: Locator) -> WebElement:
        # รอจน element แสดงผลบนจอจริง ไม่ใช่แค่มีอยู่ใน hierarchy
        return self.wait.until(
            EC.visibility_of_element_located(locator),
            message=f"Element not visible after {self.timeout}s: {locator}",
        )

    def tap(self, locator: Locator) -> None:
        # รอให้ element พร้อมกดก่อน ลดปัญหา flaky จาก animation ของหน้าจอ
        self.wait.until(
            EC.element_to_be_clickable(locator),
            message=f"Element not clickable after {self.timeout}s: {locator}",
        ).click()

    def type_text(self, locator: Locator, text: str) -> None:
        field = self.find_visible(locator)
        field.clear()
        # ข้ามการพิมพ์เมื่อเป็นค่าว่าง เพื่อจำลองผู้ใช้ที่ไม่กรอกช่องนั้น
        if text:
            field.send_keys(text)

    def text_of(self, locator: Locator) -> str:
        return self.find_visible(locator).text

    def wait_for_text(self, locator: Locator, expected: str) -> None:
        self.wait.until(
            EC.text_to_be_present_in_element(locator, expected),
            message=f"Text '{expected}' not found in {locator}",
        )

    def wait_until_gone(self, locator: Locator) -> None:
        # รอจน element หายจากจอ ใช้ยืนยันว่าเปลี่ยนหน้าหรือ dialog ปิดแล้ว ก่อนทำขั้นถัดไป
        self.wait.until(
            EC.invisibility_of_element_located(locator),
            message=f"Element still visible after {self.timeout}s: {locator}",
        )

    def is_visible(self, locator: Locator, timeout: int = 3) -> bool:
        # ใช้ timeout สั้นสำหรับการตรวจสอบแบบ true/false เพื่อไม่ให้เทสช้าเกินจำเป็น
        try:
            WebDriverWait(self.driver, timeout).until(EC.visibility_of_element_located(locator))
            return True
        except TimeoutException:
            return False

    def hide_keyboard(self) -> None:
        # ซ่อนคีย์บอร์ดก่อนกดปุ่มที่อาจถูกคีย์บอร์ดบัง
        if self.driver.is_keyboard_shown():
            self.driver.hide_keyboard()
