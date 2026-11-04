"""คลาสแม่ของหน้าที่อยู่ภายใต้ MainActivity ซึ่งมี HeaderBar ใช้ร่วมกัน"""

from appium.webdriver.webdriver import WebDriver

from pages.base_page import BasePage
from pages.header_bar import HeaderBar


class MainScreen(BasePage):
    def __init__(self, driver: WebDriver, timeout: int = BasePage.DEFAULT_TIMEOUT) -> None:
        super().__init__(driver, timeout)
        # ใช้ composition แทนการสืบทอด เพื่อให้ header เป็น component แยกที่ทดสอบซ้ำได้
        self.header = HeaderBar(driver, timeout)
