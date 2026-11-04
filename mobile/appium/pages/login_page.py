"""Page Object ของหน้า Login"""

from appium.webdriver.common.appiumby import AppiumBy

from pages.base_page import resource_id
from pages.main_screen import MainScreen


class LoginPage(MainScreen):
    # ช่องกรอกข้อมูลไม่มี content-desc ในแอป จึงใช้ resource-id ซึ่งคงที่ทุก build
    USERNAME_INPUT = resource_id("nameET")
    PASSWORD_INPUT = resource_id("passwordET")
    LOGIN_BUTTON = (AppiumBy.ACCESSIBILITY_ID, "Tap to login with given credentials")
    USERNAME_ERROR = resource_id("nameErrorTV")
    PASSWORD_ERROR = resource_id("passwordErrorTV")

    def wait_until_loaded(self) -> "LoginPage":
        self.find_visible(self.LOGIN_BUTTON)
        return self

    def is_displayed(self) -> bool:
        return self.is_visible(self.LOGIN_BUTTON)

    def submit_credentials(self, username: str, password: str) -> None:
        """กรอกข้อมูลแล้วกด Login โดยไม่คาดหวังผลลัพธ์ ใช้กับทั้งเคสสำเร็จและเคส error"""
        self.type_text(self.USERNAME_INPUT, username)
        self.type_text(self.PASSWORD_INPUT, password)
        self.hide_keyboard()
        self.tap(self.LOGIN_BUTTON)

    def login_successfully(self, username: str, password: str):
        from pages.catalog_page import CatalogPage

        self.submit_credentials(username, password)
        # login สำเร็จแอปจะล้าง back stack แล้วเปิด MainActivity ใหม่ ต้องรอให้หน้า Login หายก่อน
        # ไม่อย่างนั้นอาจไปเจอหน้า Products ของ activity เก่าที่กำลังถูกปิด แล้วกดเมนูระหว่างเปลี่ยนหน้า
        self.wait_until_gone(self.LOGIN_BUTTON)
        return CatalogPage(self.driver).wait_until_loaded()

    def error_message(self, field: str) -> str:
        """อ่านข้อความ error ใต้ช่องที่ระบุ ('username' หรือ 'password')"""
        locators = {"username": self.USERNAME_ERROR, "password": self.PASSWORD_ERROR}
        if field not in locators:
            raise ValueError(f"Unknown field '{field}', expected one of {list(locators)}")
        # error label ถูกตั้งเป็น INVISIBLE ไว้ก่อน การรอ visibility จึงยืนยันได้ว่าแอปแสดง error จริง
        return self.text_of(locators[field])
