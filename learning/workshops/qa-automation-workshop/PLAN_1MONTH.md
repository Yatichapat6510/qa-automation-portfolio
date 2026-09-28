# แผน 1 เดือน — QA Automation Fast Track
> เรียน 3 ชม. + ฝึก 3 ชม. ต่อวัน | เป้าหมาย: Apply งานจริงได้ทันที

---

## ภาพรวม 4 สัปดาห์

| สัปดาห์ | หัวข้อ                        | Tools                       |
|---------|------------------------------|-----------------------------|
| Week 1  | Foundation + API Testing     | Postman + Python Requests   |
| Week 2  | UI / E2E Testing             | Playwright JS               |
| Week 3  | Robot Framework + JMeter     | Robot + JMeter              |
| Week 4  | Integration + Mini Project   | ทุก Tools รวมกัน            |

---

## WEEK 1 — API Testing Foundation
> เป้าหมาย: เขียน API Test ได้ครอบคลุม + ทำ Report ได้

### Day 1 — HTTP & REST Basics (เรียน)
- HTTP Methods: GET / POST / PUT / DELETE / PATCH
- Status Codes: 2xx / 4xx / 5xx
- Headers: Content-Type, Authorization, Bearer Token
- Request Body: JSON format
- Response Structure
- **ฝึก:** เปิด `demo-app` แล้วทดลองเรียกทุก endpoint ด้วย browser / curl

### Day 2 — Postman Basics (เรียน + ฝึก)
- Import Collection จาก `week02-api-testing/postman_collection.json`
- Environment Variables (base_url, token)
- ส่ง Request ทุก Method
- Pre-request Script และ Tests Tab
- **ฝึก:** เขียน Test ใน Postman ให้ครบ 10 test cases

### Day 3 — Postman Advanced (เรียน + ฝึก)
- Collection Runner
- Newman (CLI runner)
- Generate HTML Report
- **ฝึก:** รัน Newman + export report ได้

### Day 4 — Python Requests + pytest (เรียน)
- ติดตั้ง pytest, requests
- เขียน test function
- assert status_code, response body
- pytest fixtures (setup/teardown)
- **ฝึก:** เขียน test_api.py ให้ครบ CRUD Users

### Day 5 — Python Test + Report (ฝึก + Review)
- pytest markers (@pytest.mark.smoke, @pytest.mark.regression)
- Generate HTML report: `pytest --html=report.html`
- **Exercise Day 5:** เขียนชุดทดสอบ Products API ให้ครบ

---

## WEEK 2 — UI / E2E Testing with Playwright JS
> เป้าหมาย: เขียน End-to-End Test หน้าเว็บได้

### Day 6 — Playwright Setup + First Test
- ติดตั้ง Node.js + Playwright
- `npx playwright test` รันครั้งแรก
- Locator: `page.locator()`, `getByRole()`, `getByText()`
- **ฝึก:** เขียน test เปิดหน้าเว็บ + assert title

### Day 7 — Playwright Actions
- click, fill, type, press, check, select
- Wait: `waitForSelector`, `waitForURL`, `waitForResponse`
- Screenshots & Video
- **ฝึก:** เขียน login flow test

### Day 8 — Playwright Advanced
- Page Object Model (POM)
- Test Fixtures
- Multiple browsers (chromium, firefox, webkit)
- `playwright.config.js`
- **ฝึก:** แปลง test เดิมเป็น POM pattern

### Day 9 — Playwright API Testing (Bonus)
- `request.get()`, `request.post()` ใน Playwright
- Combine API + UI test
- **ฝึก:** สร้าง test ที่ login ผ่าน API แล้ว verify ใน UI

### Day 10 — E2E Report + Review
- Playwright HTML Report
- allure-playwright (ถ้ามีเวลา)
- **Exercise Day 10:** เขียน E2E Test ครบ 5 Scenarios

---

## WEEK 3 — Robot Framework + Performance Testing
> เป้าหมาย: เขียน Robot test ได้ + วัด Performance เป็น

### Day 11 — Robot Framework Basics
- Syntax: Settings, Variables, Test Cases, Keywords
- SeleniumLibrary / RequestsLibrary
- Run: `robot tests/`
- **ฝึก:** เขียน Robot test เรียก API

### Day 12 — Robot Framework Web Testing
- SeleniumLibrary keywords
- Browser Setup / Teardown
- Custom Keywords
- **ฝึก:** เขียน Robot test login flow

### Day 13 — Robot Framework Advanced
- Tags, Skip, Focus
- Generate Report & Log
- Data-Driven Testing (ใช้ test template)
- **ฝึก:** เขียน Data-Driven test 5 cases

### Day 14 — JMeter Basics
- ติดตั้ง JMeter
- Thread Group, Sampler, Listener
- HTTP Request Sampler
- Response Assertion
- **ฝึก:** Load Test `/api/products` ด้วย 10 users

### Day 15 — JMeter Advanced + Report
- Ramp-up Period
- Aggregate Report, Summary Report
- Export JTL + HTML Dashboard
- **Exercise Day 15:** ทำ Performance Test plan ครบ

---

## WEEK 4 — Integration + Mini Project
> เป้าหมาย: รวม Tools ทั้งหมด + สร้าง Portfolio ได้

### Day 16-17 — Mini Project Setup
- เลือก 1 scenario จริงจากงาน (หรือ Demo App)
- วางแผน Test Strategy: Unit / API / UI / Performance
- เขียน Test Plan Document

### Day 18-19 — Implement Test Suite
- เขียน API Tests (Python/Postman)
- เขียน UI Tests (Playwright)
- เขียน Robot Test
- ทำ Performance Baseline (JMeter)

### Day 20 — Final Report + Retrospective
- รวม Report ทุกอย่าง
- สรุปสิ่งที่เรียนรู้
- ระบุจุดที่ต้องพัฒนาต่อ

---

## สรุป เป้าหมายจบ 1 เดือน

- [x] เขียน Postman Collection + Newman Report ได้
- [x] เขียน Python pytest API Test ได้
- [x] เขียน Playwright E2E Test ได้
- [x] เขียน Robot Framework Test ได้
- [x] ทำ JMeter Performance Test เบื้องต้นได้
- [x] มี Mini Project ใน Portfolio
