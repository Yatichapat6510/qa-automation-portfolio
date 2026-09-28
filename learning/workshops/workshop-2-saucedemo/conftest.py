"""
conftest.py — pytest Fixtures ที่ใช้ร่วมกันทุก Test

Fixtures คืออะไร?
= Function ที่ pytest รันให้อัตโนมัติ (เหมือน setUp/tearDown)
= เปิด Browser ก่อน test และปิดหลัง test เสร็จ
= ใช้ parameter ชื่อ fixture ใน test function เพื่อเรียกใช้
"""

import pytest
from playwright.sync_api import sync_playwright, Page


# ── Fixture: browser ─────────────────────────────────
@pytest.fixture(scope="session")
def browser():
    """
    เปิด Browser ครั้งเดียวต่อ Test Session ทั้งหมด
    scope="session" = สร้างครั้งเดียว ใช้ตลอด session
    """
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(
            headless=True,   # True = ไม่เปิดหน้าต่าง (CI)
                              # False = เปิดหน้าต่างให้เห็น
        )
        yield browser
        browser.close()


# ── Fixture: page ─────────────────────────────────────
@pytest.fixture
def page(browser) -> Page:
    """
    สร้าง Page ใหม่สำหรับแต่ละ Test
    scope ไม่ระบุ = "function" = สร้างใหม่ทุก test
    ทำให้แต่ละ test เริ่มต้นด้วย browser สะอาด
    """
    context = browser.new_context(
        viewport={"width": 1280, "height": 720}
    )
    page = context.new_page()
    yield page
    # Cleanup หลัง test แต่ละตัว
    context.close()


# ── Fixture: logged_in_page ───────────────────────────
@pytest.fixture
def logged_in_page(page: Page) -> Page:
    """
    Page ที่ Login แล้ว — ใช้สำหรับ Test ที่ต้องการ Login ก่อน
    แทนที่จะ Login ซ้ำในทุก test ใช้ fixture นี้แทน

    ตัวอย่างการใช้:
        def test_something(logged_in_page):
            # logged_in_page อยู่ที่หน้า Products แล้ว
            ...
    """
    from login_page import LoginPage
    login_page = LoginPage(page)
    login_page.goto()
    login_page.login("standard_user", "secret_sauce")
    # รอให้โหลดหน้า Products
    page.wait_for_url("**/inventory**")
    return page
