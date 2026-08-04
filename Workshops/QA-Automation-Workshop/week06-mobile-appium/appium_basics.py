"""
Week 6 — Mobile Testing with Appium + Python
ทดสอบ Android App ด้วย appium-python-client

ติดตั้ง:
    pip install Appium-Python-Client selenium

ต้องมี:
    - Android Emulator หรือ Device จริง
    - Appium Server รันอยู่ที่ port 4723
    - App APK (ใช้ ApiDemos-debug.apk สำหรับฝึก)

ดาวน์โหลด ApiDemos: https://github.com/appium/appium/tree/master/packages/appium/sample-code
"""

import pytest
from appium import webdriver
from appium.options import UiAutomator2Options
from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# ========== DESIRED CAPABILITIES ==========

def get_android_options():
    """สร้าง capabilities สำหรับ Android"""
    options = UiAutomator2Options()
    options.platform_name = "Android"
    options.platform_version = "13"          # เวอร์ชัน Android ของ emulator
    options.device_name = "emulator-5554"    # ชื่อ emulator
    options.app_package = "io.appium.android.apis"   # Package name ของ app
    options.app_activity = ".ApiDemos"               # Activity ตั้งต้น
    options.no_reset = False
    options.full_reset = False
    return options

APPIUM_URL = "http://localhost:4723"

# ========== FIXTURES ==========

@pytest.fixture(scope="function")
def driver():
    """สร้าง driver สำหรับแต่ละ test"""
    options = get_android_options()
    d = webdriver.Remote(APPIUM_URL, options=options)
    d.implicitly_wait(10)
    yield d
    d.quit()

# ========== HELPER FUNCTIONS ==========

def find_by_id(driver, resource_id, timeout=10):
    """หา element ด้วย resource-id"""
    wait = WebDriverWait(driver, timeout)
    return wait.until(EC.presence_of_element_located((AppiumBy.ID, resource_id)))

def find_by_text(driver, text, timeout=10):
    """หา element ด้วยข้อความ"""
    wait = WebDriverWait(driver, timeout)
    return wait.until(EC.presence_of_element_located(
        (AppiumBy.ANDROID_UIAUTOMATOR, f'new UiSelector().text("{text}")')
    ))

def find_by_xpath(driver, xpath, timeout=10):
    """หา element ด้วย XPath"""
    wait = WebDriverWait(driver, timeout)
    return wait.until(EC.presence_of_element_located((AppiumBy.XPATH, xpath)))

def take_screenshot(driver, name="screenshot"):
    """ถ่าย screenshot"""
    filename = f"screenshots/{name}_{int(time.time())}.png"
    driver.save_screenshot(filename)
    return filename

# ========== TESTS ==========

class TestAppiumBasics:
    """
    Test Cases เบื้องต้นสำหรับ ApiDemos App
    (ปรับ locator ให้ตรงกับ App ที่คุณใช้)
    """

    def test_app_launches(self, driver):
        """TC-001: App เปิดได้และแสดงหน้าหลัก"""
        # ตรวจสอบว่า app เปิดมาแล้ว
        assert driver.current_activity is not None
        print(f"Current activity: {driver.current_activity}")

    def test_get_app_package(self, driver):
        """TC-002: ตรวจสอบ package name ถูกต้อง"""
        package = driver.current_package
        assert "appium" in package or "android" in package
        print(f"Current package: {package}")

    def test_screen_size(self, driver):
        """TC-003: ดู screen size"""
        size = driver.get_window_size()
        assert size["width"] > 0
        assert size["height"] > 0
        print(f"Screen size: {size['width']}x{size['height']}")

    def test_take_screenshot(self, driver):
        """TC-004: ถ่าย screenshot ได้"""
        driver.save_screenshot("test_screenshot.png")
        import os
        assert os.path.exists("test_screenshot.png")

    def test_find_element_by_text(self, driver):
        """TC-005: หา element ด้วยข้อความ"""
        try:
            # สำหรับ ApiDemos app
            element = driver.find_element(
                AppiumBy.ANDROID_UIAUTOMATOR,
                'new UiSelector().textContains("Animation")'
            )
            assert element is not None
            assert element.is_displayed()
        except Exception as e:
            pytest.skip(f"Element not found (ปรับ locator ให้ตรงกับ app ของคุณ): {e}")

    def test_scroll_down(self, driver):
        """TC-006: Scroll ลงได้"""
        size = driver.get_window_size()
        start_x = size["width"] // 2
        start_y = int(size["height"] * 0.8)
        end_y   = int(size["height"] * 0.2)
        driver.swipe(start_x, start_y, start_x, end_y, 500)
        time.sleep(1)

    def test_tap_element(self, driver):
        """TC-007: Tap element ได้"""
        try:
            elements = driver.find_elements(AppiumBy.CLASS_NAME, "android.widget.TextView")
            if elements:
                elements[0].click()
                time.sleep(0.5)
                driver.back()
        except Exception as e:
            pytest.skip(f"ปรับ locator ให้ตรงกับ app ของคุณ: {e}")


# ========== PAGE OBJECT PATTERN ==========

class AndroidBasePage:
    """Base Page Object สำหรับ Android"""

    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 15)

    def click(self, locator_type, locator_value):
        element = self.wait.until(EC.element_to_be_clickable((locator_type, locator_value)))
        element.click()

    def type_text(self, locator_type, locator_value, text):
        element = self.wait.until(EC.presence_of_element_located((locator_type, locator_value)))
        element.clear()
        element.send_keys(text)

    def get_text(self, locator_type, locator_value):
        element = self.wait.until(EC.presence_of_element_located((locator_type, locator_value)))
        return element.text

    def is_displayed(self, locator_type, locator_value):
        try:
            element = self.driver.find_element(locator_type, locator_value)
            return element.is_displayed()
        except Exception:
            return False

    def swipe_up(self):
        size = self.driver.get_window_size()
        self.driver.swipe(
            size["width"] // 2, int(size["height"] * 0.8),
            size["width"] // 2, int(size["height"] * 0.2),
            500
        )

    def swipe_down(self):
        size = self.driver.get_window_size()
        self.driver.swipe(
            size["width"] // 2, int(size["height"] * 0.2),
            size["width"] // 2, int(size["height"] * 0.8),
            500
        )

    def take_screenshot(self, name="page"):
        self.driver.save_screenshot(f"screenshots/{name}.png")


# ========== วิธีใช้งาน ==========
"""
# ขั้นตอนการเริ่มต้น Appium:

1. ติดตั้ง Appium:
   npm install -g appium
   appium driver install uiautomator2

2. รัน Appium Server:
   appium --port 4723

3. ติดตั้ง Android Emulator:
   - Android Studio > AVD Manager
   - สร้าง Virtual Device

4. ตรวจสอบ Device:
   adb devices

5. รัน test:
   pytest appium_basics.py -v

# ค้นหา Locator ด้วย Appium Inspector:
1. ดาวน์โหลด: https://github.com/appium/appium-inspector
2. ใส่ capabilities เดียวกับ get_android_options()
3. Start Session → คลิก element → ดู locator
"""
