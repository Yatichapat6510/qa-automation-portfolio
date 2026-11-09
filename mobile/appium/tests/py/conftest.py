"""Fixtures ส่วนกลางของชุดทดสอบ Appium (pytest)"""

import re
from pathlib import Path

import pytest
from appium import webdriver

from config.capabilities import APP_PACKAGE, APPIUM_SERVER_URL, build_android_options
from pages.catalog_page import CatalogPage
from pages.system_dialogs import SystemDialogs

# test_smoke.py เป็นสคริปต์ที่เปิด session ทันทีตอน import จึงไม่ให้ pytest เก็บไปรัน
collect_ignore = ["test_smoke.py"]


@pytest.fixture(scope="session")
def driver():
    """เปิด Appium session ครั้งเดียวต่อการรันทั้งชุด เพื่อลดเวลาเริ่ม session ซ้ำ"""
    appium_driver = webdriver.Remote(APPIUM_SERVER_URL, options=build_android_options())
    # ปิด implicit wait เพราะทุก Page Object ใช้ explicit wait อยู่แล้ว การใช้ปนกันทำให้เวลารอคาดเดายาก
    appium_driver.implicitly_wait(0)
    yield appium_driver
    appium_driver.quit()


@pytest.fixture
def app(driver) -> CatalogPage:
    """รีสตาร์ทแอปก่อนทุกเทส แล้วคืนหน้า Products ที่โหลดเสร็จแล้ว

    สถานะ login และตะกร้าของแอปนี้เก็บไว้ในหน่วยความจำ
    การ terminate แล้ว activate ใหม่จึงเพียงพอให้แต่ละเทสเริ่มจาก state ที่สะอาด
    """
    driver.terminate_app(APP_PACKAGE)
    driver.activate_app(APP_PACKAGE)
    # บน Android 15+ ระบบอาจแสดง dialog ความเข้ากันได้ (16 KB page size) ทับแอปตอนเปิด ต้องปิดก่อนเริ่มเทส
    SystemDialogs(driver).wait_for_app_or_dismiss_dialog(CatalogPage.PRODUCT_LIST)
    return CatalogPage(driver).wait_until_loaded()


@pytest.hookimpl(wrapper=True)
def pytest_runtest_makereport(item, call):
    """เก็บ screenshot อัตโนมัติเมื่อเทสหรือขั้น setup ล้มเหลว ไว้ที่ results/screenshots/"""
    report = yield
    if report.when in ("setup", "call") and report.failed:
        appium_driver = item.funcargs.get("driver")
        if appium_driver is not None:
            screenshot_dir = Path(item.config.rootpath) / "results" / "screenshots"
            screenshot_dir.mkdir(parents=True, exist_ok=True)
            # แปลงชื่อเทส (รวม parametrize id) ให้เป็นชื่อไฟล์ที่ใช้ได้บนทุก OS
            file_name = re.sub(r"[^\w.-]", "_", item.name) + ".png"
            appium_driver.save_screenshot(str(screenshot_dir / file_name))
    return report
