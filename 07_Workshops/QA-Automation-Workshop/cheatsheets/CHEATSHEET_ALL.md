# QA Automation Cheatsheet — Quick Reference

---

## Python + pytest

```bash
# ติดตั้ง
pip install pytest requests pytest-html pytest-cov

# รัน tests
pytest                          # รันทุก test
pytest -v                       # verbose
pytest -k "test_login"          # รัน test ที่ชื่อมี "login"
pytest -m smoke                 # รัน test ที่ mark เป็น smoke
pytest --html=report.html       # สร้าง HTML report
pytest -x                       # หยุดเมื่อ fail ครั้งแรก
pytest -s                       # แสดง print() output
```

```python
# Test structure
import pytest, requests

BASE_URL = "http://localhost:5000"

@pytest.fixture
def auth_headers():
    return {"Authorization": "Bearer test-token-123"}

def test_something(auth_headers):
    res = requests.get(f"{BASE_URL}/api/users", headers=auth_headers)
    assert res.status_code == 200          # ตรวจ status
    assert res.json()["total"] > 0         # ตรวจ body
    assert "data" in res.json()            # ตรวจ key

@pytest.mark.parametrize("id,status", [("1", 200), ("999", 404)])
def test_user(id, status, auth_headers):
    res = requests.get(f"{BASE_URL}/api/users/{id}", headers=auth_headers)
    assert res.status_code == status
```

---

## Postman Tests (JavaScript)

```javascript
// Test พื้นฐาน
pm.test("Status is 200", () => pm.response.to.have.status(200));
pm.test("Body has token", () => {
    const body = pm.response.json();
    pm.expect(body).to.have.property("token");
    pm.expect(body.token).to.not.be.empty;
});

// Save variable
pm.environment.set("token", pm.response.json().token);

// ใช้ variable
// Header: Authorization: Bearer {{token}}

// Newman CLI
// npm install -g newman newman-reporter-htmlextra
// newman run collection.json -e env.json -r htmlextra
```

---

## Playwright JS

```bash
# ติดตั้ง
npm init -y
npm install -D @playwright/test
npx playwright install

# รัน
npx playwright test
npx playwright test --headed
npx playwright test --reporter=html
npx playwright show-report
```

```javascript
const { test, expect } = require('@playwright/test');

test('API Test', async ({ request }) => {
    const res = await request.get('http://localhost:5000/health');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.status).toBe('ok');
});

test('POST with body', async ({ request }) => {
    const res = await request.post('/api/login', {
        data: { username: 'admin', password: 'password123' }
    });
    expect(res.status()).toBe(200);
    const { token } = await res.json();
    expect(token).toBeTruthy();
});
```

---

## Robot Framework

```bash
# ติดตั้ง
pip install robotframework robotframework-requests

# รัน
robot tests/
robot -d results tests/          # output ใน results/
robot -t "TC-001*" tests/        # รัน test ที่ชื่อขึ้นต้นด้วย TC-001
robot --include smoke tests/     # รัน test ที่ tag เป็น smoke
```

```robotframework
*** Settings ***
Library    RequestsLibrary
Suite Setup    Create Session    api    http://localhost:5000

*** Variables ***
${TOKEN}    test-token-123

*** Test Cases ***
TC-001 Get Products
    [Tags]    smoke
    ${res}=    GET On Session    api    /api/products
    Should Be Equal As Integers    ${res.status_code}    200
    ${body}=    Set Variable    ${res.json()}
    Should Be True    ${body}[total] > 0

*** Keywords ***
Get Auth Headers
    ${h}=    Create Dictionary    Authorization=Bearer ${TOKEN}
    RETURN    ${h}
```

---

## JMeter Quick Reference

```bash
# รัน CLI
jmeter -n -t test_plan.jmx -l results.jtl
jmeter -g results.jtl -o dashboard/
```

| Element           | ทำอะไร                          |
|-------------------|---------------------------------|
| Thread Group      | กำหนด concurrent users          |
| HTTP Request      | ส่ง HTTP request                |
| CSV Data Set      | อ่าน test data จาก CSV          |
| Response Assertion| ตรวจสอบ response                |
| JSON Extractor    | ดึงค่าจาก JSON response         |
| Aggregate Report  | สรุปผล (Avg, 90th, TPS, Error%) |
| Summary Report    | สรุปแบบย่อ                      |

---

## HTTP Status Codes (QA ต้องรู้)

| Code | ความหมาย         | เจอเมื่อไหร่                    |
|------|-----------------|-------------------------------|
| 200  | OK              | GET สำเร็จ                     |
| 201  | Created         | POST สร้างใหม่สำเร็จ            |
| 400  | Bad Request     | request ผิด format             |
| 401  | Unauthorized    | ไม่มี / token ผิด              |
| 403  | Forbidden       | มี token แต่ไม่มีสิทธิ์        |
| 404  | Not Found       | ไม่พบ resource                 |
| 409  | Conflict        | ซ้ำกัน (เช่น email ซ้ำ)        |
| 422  | Unprocessable   | ข้อมูลไม่ครบ / validation fail |
| 500  | Server Error    | bug ฝั่ง server                |

---

## Appium Quick Reference

```python
from appium import webdriver
from appium.options import UiAutomator2Options
from appium.webdriver.common.appiumby import AppiumBy

options = UiAutomator2Options()
options.platform_name = "Android"
options.device_name = "emulator-5554"
options.app_package = "com.example.app"
options.app_activity = ".MainActivity"

driver = webdriver.Remote("http://localhost:4723", options=options)

# Find element
el = driver.find_element(AppiumBy.ID, "com.example.app:id/button")
el.click()

# Type text
driver.find_element(AppiumBy.ID, "login_field").send_keys("admin")

# Swipe
driver.swipe(500, 1000, 500, 200, 500)

# Screenshot
driver.save_screenshot("screen.png")

driver.quit()
```

---

## Git Quick Reference (สำหรับ Test Project)

```bash
git init
git add .
git commit -m "feat: add API tests"
git push origin main

# Branching
git checkout -b feature/add-playwright-tests
git add .
git commit -m "test: add playwright e2e tests"
git push origin feature/add-playwright-tests
```

---

## .gitignore สำหรับ QA Project

```
# Python
__pycache__/
*.pyc
.pytest_cache/
venv/
.env

# Reports
reports/
playwright-report/
allure-results/
screenshots/
*.jtl

# Node
node_modules/
```
