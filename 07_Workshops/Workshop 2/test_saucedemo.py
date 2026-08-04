"""
🎓 QA Workshop: Playwright E2E Tests สำหรับมือใหม่
=====================================================
ภาษา:   Python (pytest + playwright)
Target: https://www.saucedemo.com
Pattern: Page Object Model (POM)

📚 วิธีรัน:
    pip install pytest playwright pytest-playwright
    playwright install chromium
    pytest tests/ -v
    pytest tests/ -v --headed          ← เปิดหน้าต่างให้เห็น
    pytest tests/ --html=report.html   ← สร้าง HTML Report

🔑 Test Accounts:
    Username: standard_user  | Password: secret_sauce
    Locked:   locked_out_user

📁 โครงสร้างไฟล์:
    conftest.py                ← Fixtures (browser, page, logged_in_page)
    pages/login_page.py        ← Page Object ของหน้า Login
    pages/products_page.py     ← Page Object ของหน้า Products
    pages/checkout_page.py     ← Page Object ของหน้า Checkout
    tests/test_saucedemo.py    ← ไฟล์นี้ (Test Cases)

💡 Python vs JavaScript:
    Python ใช้ sync (ไม่มี async/await) อ่านง่ายกว่า
    ชื่อ function ใช้ snake_case (my_function แทน myFunction)
    Fixtures ใช้ @pytest.fixture แทน beforeEach
"""

import re
import pytest
from playwright.sync_api import Page, expect

# Import Page Objects
from login_page    import LoginPage
from products_page import ProductsPage
from checkout_page import CheckoutPage


# ═══════════════════════════════════════════════════
# 📘 บทที่ 1: Login Tests
# ═══════════════════════════════════════════════════
# pytest จัดกลุ่ม test โดยใช้ class หรือชื่อไฟล์
# class ต้องขึ้นต้นด้วย "Test" เสมอ

class TestLogin:
    """ทดสอบหน้า Login"""

    # ─────────────────────────────────────────────────
    def test_tc001_login_success(self, page: Page):
        """TC-001: Login สำเร็จด้วย credentials ถูกต้อง"""
        # ── Arrange (เตรียมข้อมูล) ──
        login_page = LoginPage(page)

        # ── Act (ทำ Action) ──
        login_page.goto()
        login_page.login("standard_user", "secret_sauce")

        # ── Assert (ตรวจสอบผลลัพธ์) ──
        # ✅ URL ต้องมี /inventory
        expect(page).to_have_url(re.compile("inventory"))
        # ✅ ต้องเห็นหัวข้อ Products
        expect(page.locator(".title")).to_contain_text("Products")

    # ─────────────────────────────────────────────────
    def test_tc002_login_locked_account(self, page: Page):
        """TC-002: Login ล้มเหลว - Account ถูก Lock"""
        login_page = LoginPage(page)
        login_page.goto()

        # ใช้ locked_out_user
        login_page.login("locked_out_user", "secret_sauce")

        # ✅ ต้องเห็น Error Message
        expect(login_page.error_message).to_be_visible()
        error_text = login_page.get_error()
        assert "locked out" in error_text

    # ─────────────────────────────────────────────────
    def test_tc003_login_empty_username(self, page: Page):
        """TC-003: Login ล้มเหลว - ไม่กรอก Username"""
        login_page = LoginPage(page)
        login_page.goto()

        # กด Login โดยไม่กรอกอะไร
        login_page.login_button.click()

        expect(login_page.error_message).to_contain_text("Username is required")

    # ─────────────────────────────────────────────────
    def test_tc004_login_wrong_password(self, page: Page):
        """TC-004: Login ล้มเหลว - Password ผิด"""
        login_page = LoginPage(page)
        login_page.goto()
        login_page.login("standard_user", "wrong_password")

        expect(login_page.error_message).to_contain_text("do not match")

    # ─────────────────────────────────────────────────
    def test_tc005_login_empty_password(self, page: Page):
        """TC-005: Login ล้มเหลว - ไม่กรอก Password"""
        login_page = LoginPage(page)
        login_page.goto()

        # กรอกแค่ username
        page.fill("#user-name", "standard_user")
        login_page.login_button.click()

        expect(login_page.error_message).to_contain_text("Password is required")


# ═══════════════════════════════════════════════════
# 📗 บทที่ 2: Products Tests
# ═══════════════════════════════════════════════════

class TestProducts:
    """ทดสอบหน้า Products"""

    # logged_in_page = Fixture จาก conftest.py
    # = Page ที่ Login แล้วและอยู่ที่หน้า Products

    # ─────────────────────────────────────────────────
    def test_tc006_products_count(self, logged_in_page: Page):
        """TC-006: หน้า Products แสดงสินค้า 6 ชิ้น"""
        products_page = ProductsPage(logged_in_page)

        # นับจำนวนสินค้า
        count = products_page.product_items.count()
        assert count == 6, f"Expected 6 products, got {count}"

    # ─────────────────────────────────────────────────
    def test_tc007_add_to_cart_badge(self, logged_in_page: Page):
        """TC-007: เพิ่มสินค้าเข้า Cart - Badge แสดงเลข 1"""
        products_page = ProductsPage(logged_in_page)

        # ก่อนเพิ่ม: Cart ต้องว่าง
        expect(products_page.cart_badge).not_to_be_visible()

        # กด Add to Cart
        products_page.add_first_item_to_cart()

        # หลังเพิ่ม: Badge ต้องแสดงเลข 1
        expect(products_page.cart_badge).to_be_visible()
        expect(products_page.cart_badge).to_contain_text("1")

    # ─────────────────────────────────────────────────
    def test_tc008_remove_from_cart(self, logged_in_page: Page):
        """TC-008: ลบสินค้าออกจาก Cart - Badge หายไป"""
        products_page = ProductsPage(logged_in_page)

        # เพิ่มก่อน
        products_page.add_first_item_to_cart()
        expect(products_page.cart_badge).to_contain_text("1")

        # ลบออก
        products_page.remove_first_item_from_cart()

        # Badge ต้องหายไป
        expect(products_page.cart_badge).not_to_be_visible()

    # ─────────────────────────────────────────────────
    def test_tc009_product_has_required_elements(self, logged_in_page: Page):
        """TC-009: สินค้ามีชื่อ ราคา และปุ่ม Add to Cart"""
        expect(logged_in_page.locator(".inventory_item_name").first).to_be_visible()
        expect(logged_in_page.locator(".inventory_item_price").first).to_be_visible()
        expect(logged_in_page.locator('[data-test*="add-to-cart"]').first).to_be_visible()


# ═══════════════════════════════════════════════════
# 📕 บทที่ 3: E2E Checkout
# ═══════════════════════════════════════════════════

class TestCheckout:
    """ทดสอบกระบวนการ Checkout"""

    # ─────────────────────────────────────────────────
    def test_tc010_complete_checkout(self, logged_in_page: Page):
        """TC-010: กระบวนการ Checkout สมบูรณ์ทั้งหมด"""
        products_page = ProductsPage(logged_in_page)
        checkout_page = CheckoutPage(logged_in_page)

        # ขั้นตอน 1: เพิ่มสินค้า
        products_page.add_first_item_to_cart()
        assert products_page.get_cart_count() == 1

        # ขั้นตอน 2: ไปหน้า Cart
        products_page.go_to_cart()
        expect(logged_in_page).to_have_url(re.compile("cart"))

        # ขั้นตอน 3: กด Checkout
        checkout_page.checkout_button.click()
        expect(logged_in_page).to_have_url(re.compile("checkout-step-one"))

        # ขั้นตอน 4: กรอกข้อมูล Shipping
        checkout_page.fill_info("สมชาย", "ใจดี", "10110")
        expect(logged_in_page).to_have_url(re.compile("checkout-step-two"))

        # ขั้นตอน 5: กด Finish ยืนยัน
        checkout_page.finish()
        expect(logged_in_page).to_have_url(re.compile("checkout-complete"))
        expect(checkout_page.complete_header).to_contain_text("Thank you for your order!")

    # ─────────────────────────────────────────────────
    def test_tc011_checkout_requires_first_name(self, logged_in_page: Page):
        """TC-011: Checkout ต้องกรอก First Name"""
        products_page = ProductsPage(logged_in_page)
        checkout_page = CheckoutPage(logged_in_page)

        products_page.add_first_item_to_cart()
        products_page.go_to_cart()
        checkout_page.checkout_button.click()

        # ไม่กรอก First Name
        checkout_page.last_name_input.fill("ใจดี")
        checkout_page.zip_input.fill("10110")
        checkout_page.continue_button.click()

        # ต้องเห็น Error
        expect(checkout_page.error_message).to_contain_text("First Name is required")
