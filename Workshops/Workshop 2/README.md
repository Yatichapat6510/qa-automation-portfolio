# 🎓 QA Workshop — Playwright (JavaScript & Python)

---

## 📁 โครงสร้างไฟล์

```
playwright/
│
├── 🟨 javascript/                         ← ชุด JavaScript
│   ├── package.json                       ← dependencies
│   ├── playwright.config.js               ← config
│   ├── pages/
│   │   ├── LoginPage.js                   ← Page Object: Login
│   │   ├── ProductsPage.js                ← Page Object: Products
│   │   └── CheckoutPage.js                ← Page Object: Checkout
│   └── tests/
│       └── saucedemo.spec.js              ← Test Cases
│
└── 🐍 python/                             ← ชุด Python
    ├── requirements.txt                   ← dependencies
    ├── pytest.ini                         ← config
    ├── conftest.py                        ← Fixtures (browser, page)
    ├── pages/
    │   ├── __init__.py
    │   ├── login_page.py                  ← Page Object: Login
    │   ├── products_page.py               ← Page Object: Products
    │   └── checkout_page.py               ← Page Object: Checkout
    └── tests/
        └── test_saucedemo.py              ← Test Cases
```

---

## 🚀 วิธีติดตั้งและรัน

### 🟨 JavaScript

```bash
cd javascript

# 1. ติดตั้ง dependencies
npm install

# 2. ติดตั้ง Playwright browser
npx playwright install chromium

# 3. รัน tests ทั้งหมด
npx playwright test

# 4. ดู HTML Report
npx playwright show-report

# รัน tests แบบเห็นหน้าต่าง Browser
npx playwright test --headed

# รันเฉพาะ บทที่ 1 (Login)
npx playwright test --grep "บทที่ 1"
```

### 🐍 Python

```bash
cd python

# 1. ติดตั้ง dependencies
pip install -r requirements.txt

# 2. ติดตั้ง Playwright browser
playwright install chromium

# 3. รัน tests ทั้งหมด
pytest tests/ -v

# รัน tests แบบเห็นหน้าต่าง Browser
pytest tests/ -v --headed

# รัน tests แบบ slow-motion (debug ง่าย)
pytest tests/ -v --headed --slowmo=500

# สร้าง HTML Report
pytest tests/ -v --html=report.html --self-contained-html

# รันเฉพาะ class
pytest tests/test_saucedemo.py::TestLogin -v
```

---

## 🔄 เปรียบเทียบ JavaScript vs Python

### 1. Import

| JavaScript | Python |
|-----------|--------|
| `const { test, expect } = require('@playwright/test')` | `from playwright.sync_api import Page, expect` |
| `const { LoginPage } = require('../pages/LoginPage')` | `from pages.login_page import LoginPage` |

### 2. Test Structure

**JavaScript:**
```javascript
test.describe('กลุ่ม tests', () => {
  test.beforeEach(async ({ page }) => {
    // setup
  });

  test('ชื่อ test', async ({ page }) => {
    // test body
  });
});
```

**Python:**
```python
class TestGroup:
    def test_something(self, page: Page):
        # test body (ใช้ fixture จาก conftest.py แทน beforeEach)
```

### 3. Async vs Sync

| JavaScript | Python |
|-----------|--------|
| `await page.goto(url)` | `page.goto(url)` |
| `await page.fill('#id', 'text')` | `page.fill('#id', 'text')` |
| `await expect(el).toBeVisible()` | `expect(el).to_be_visible()` |
| ต้องใช้ `async/await` ทุกที่ | ไม่ต้องใช้ (sync_api) |

### 4. Assertions

| JavaScript | Python |
|-----------|--------|
| `expect(el).toBeVisible()` | `expect(el).to_be_visible()` |
| `expect(el).toContainText('x')` | `expect(el).to_contain_text('x')` |
| `expect(page).toHaveURL(/pattern/)` | `expect(page).to_have_url(re.compile('pattern'))` |
| `expect(el).not.toBeVisible()` | `expect(el).not_to_be_visible()` |

### 5. Naming Convention

| JavaScript | Python |
|-----------|--------|
| camelCase: `loginPage` | snake_case: `login_page` |
| `loginButton` | `login_button` |
| `addFirstItemToCart()` | `add_first_item_to_cart()` |

---

## 🏆 Test Cases ทั้งหมด (เหมือนกันทั้ง 2 ภาษา)

| TC ID | ชื่อ | บทที่ |
|-------|------|-------|
| TC-001 | Login สำเร็จด้วย credentials ถูกต้อง | 1: Login |
| TC-002 | Login ล้มเหลว - Account ถูก Lock | 1: Login |
| TC-003 | Login ล้มเหลว - ไม่กรอก Username | 1: Login |
| TC-004 | Login ล้มเหลว - Password ผิด | 1: Login |
| TC-005 | Login ล้มเหลว - ไม่กรอก Password | 1: Login |
| TC-006 | หน้า Products แสดงสินค้า 6 ชิ้น | 2: Products |
| TC-007 | เพิ่มสินค้าเข้า Cart - Badge แสดงเลข 1 | 2: Products |
| TC-008 | ลบสินค้าออกจาก Cart - Badge หายไป | 2: Products |
| TC-009 | สินค้ามีชื่อ ราคา และปุ่ม Add to Cart | 2: Products |
| TC-010 | กระบวนการ Checkout สมบูรณ์ทั้งหมด | 3: Checkout E2E |
| TC-011 | Checkout ต้องกรอก First Name | 3: Checkout E2E |
