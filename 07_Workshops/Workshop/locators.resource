*** Settings ***
Documentation
...    📌 ไฟล์ Locators: เก็บตำแหน่ง Elements ทั้งหมด
...    ================================================
...    ทำไมต้องแยกไฟล์?
...    → เวลา UI เปลี่ยน แก้ที่นี่ที่เดียว ไม่ต้องแก้ทุก test
...    → ง่ายต่อการดูแลและอัปเดต

*** Variables ***
# ─────────────────────────────────
# 🔑 Login Page
# ─────────────────────────────────
${LOCATOR_ช่องUsername}        id=user-name
${LOCATOR_ช่องPassword}        id=password
${LOCATOR_ปุ่มLogin}           id=login-button
${LOCATOR_ข้อความError}        css=[data-test="error"]

# ─────────────────────────────────
# 🛍️ Products Page
# ─────────────────────────────────
${LOCATOR_สินค้า}              css=.inventory_item
${LOCATOR_ชื่อสินค้า}          css=.inventory_item_name
${LOCATOR_ราคาสินค้า}          css=.inventory_item_price
${LOCATOR_ปุ่มAddToCart_แรก}   css=.inventory_item:first-child [data-test*="add-to-cart"]
${LOCATOR_ปุ่มRemove_แรก}      css=.inventory_item:first-child [data-test*="remove"]
${LOCATOR_Dropdown_Sort}        css=[data-test="product_sort_container"]

# ─────────────────────────────────
# 🛒 Cart
# ─────────────────────────────────
${LOCATOR_CartIcon}             css=.shopping_cart_link
${LOCATOR_CartBadge}            css=.shopping_cart_badge
${LOCATOR_CartItem}             css=.cart_item
${LOCATOR_ปุ่มCheckout}         id=checkout

# ─────────────────────────────────
# 📦 Checkout Page
# ─────────────────────────────────
${LOCATOR_ช่องFirstName}        id=first-name
${LOCATOR_ช่องLastName}         id=last-name
${LOCATOR_ช่องZipCode}          id=postal-code
${LOCATOR_ปุ่มContinue}         id=continue
${LOCATOR_ปุ่มFinish}           id=finish
${LOCATOR_ข้อความComplete}      css=.complete-header
${LOCATOR_ข้อความErrorCheckout} css=[data-test="error"]

# ─────────────────────────────────
# 🔧 Navigation
# ─────────────────────────────────
${LOCATOR_MenuButton}           id=react-burger-menu-btn
${LOCATOR_LogoutLink}           id=logout_sidebar_link
