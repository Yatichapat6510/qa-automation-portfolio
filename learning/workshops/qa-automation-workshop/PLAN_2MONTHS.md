# แผน 2 เดือน — QA Automation Professional
> เรียน 3 ชม. + ฝึก 3 ชม. ต่อวัน | เป้าหมาย: Senior QA Automation ระดับงานจริง

---

## ภาพรวม 8 สัปดาห์

| สัปดาห์ | หัวข้อ                           | Tools                         |
|---------|----------------------------------|-------------------------------|
| Week 1  | Foundation + Python Basics       | Python, Git                   |
| Week 2  | API Testing Deep Dive            | Postman + Newman               |
| Week 3  | Python API Test Framework        | pytest + requests              |
| Week 4  | UI/E2E Testing                   | Playwright JS                 |
| Week 5  | Robot Framework Professional     | Robot + SeleniumLib            |
| Week 6  | Performance Testing              | JMeter                        |
| Week 7  | Mobile Testing                   | Appium + Python                |
| Week 8  | CI/CD + Final Project            | GitHub Actions + ทุก Tools     |

---

## WEEK 1 — Foundation
> เป้าหมาย: Python + Git พร้อมใช้งาน

### Day 1 — Python Quick Start (สำหรับ QA)
- Variables, Data Types, f-string
- List, Dict (เหมือน JSON)
- if/else, for loop
- Functions: def, return, parameters
- **ฝึก:** เขียน script อ่าน JSON file

### Day 2 — Python สำหรับ Testing
- Try/Except (Error handling)
- File I/O: อ่าน/เขียน JSON, CSV
- os, datetime, uuid modules
- **ฝึก:** เขียน script generate test data

### Day 3 — Git Basics
- git init, add, commit, push
- Branching: feature branch workflow
- .gitignore สำหรับ test projects
- **ฝึก:** Push workshop files ขึ้น GitHub

### Day 4 — Environment Setup
- Virtual Environment (venv)
- pip, requirements.txt
- .env file (python-dotenv)
- IDE: VS Code + Extensions
- **ฝึก:** ติดตั้งทุก tools ให้สมบูรณ์

### Day 5 — Review + SQL ทบทวน
- SELECT / WHERE / JOIN ที่ใช้ใน QA
- Verify DB หลัง API call
- **ฝึก:** เขียน SQL verify ข้อมูลหลัง POST user

---

## WEEK 2 — API Testing with Postman (Deep Dive)
> เป้าหมาย: Postman Professional + CI/CD Ready

### Day 6 — Postman Environment & Variables
- Global / Environment / Collection variables
- Dynamic variables: `{{$randomEmail}}`
- Pre-request Scripts (JavaScript)
- **ฝึก:** ตั้งค่า environment dev/staging/prod

### Day 7 — Postman Tests (JavaScript)
- `pm.test()`, `pm.expect()`
- Chain tests: เอา response ไปใช้ต่อ
- Set variable from response: `pm.environment.set()`
- **ฝึก:** Login → Save token → ใช้ token ต่อ

### Day 8 — Postman Advanced
- Mock Server
- API Documentation
- Monitor
- **ฝึก:** สร้าง Mock สำหรับ endpoint ที่ยังไม่มี

### Day 9 — Newman CLI
- `newman run collection.json -e env.json`
- HTML Extra Reporter
- JUnit Reporter (สำหรับ CI)
- **ฝึก:** รัน Newman + export HTML report

### Day 10 — Postman + GitHub Actions
- เขียน `.github/workflows/api-test.yml`
- รัน Newman ใน GitHub Actions
- **ฝึก:** Push แล้วให้ CI รัน test อัตโนมัติ

---

## WEEK 3 — Python API Test Framework
> เป้าหมาย: สร้าง Test Framework เองได้

### Day 11 — pytest Fundamentals
- Test discovery, naming conventions
- assert vs pytest assertions
- Fixtures: scope (function/class/module/session)
- `conftest.py`
- **ฝึก:** เขียน conftest.py setup Flask app

### Day 12 — pytest Advanced
- Parametrize: `@pytest.mark.parametrize`
- Markers: smoke, regression, negative
- `pytest.ini` configuration
- **ฝึก:** เขียน parametrized test 10 cases

### Day 13 — API Test Framework Structure
```
tests/
├── conftest.py
├── api/
│   ├── test_auth.py
│   ├── test_users.py
│   └── test_products.py
└── utils/
    ├── api_client.py
    └── test_data.py
```
- **ฝึก:** สร้างโครงสร้างนี้

### Day 14 — API Client Class + Test Data
- เขียน APIClient class (requests wrapper)
- Factory pattern สำหรับ test data
- Faker library สำหรับ random data
- **ฝึก:** ใช้ APIClient ใน test ทุกตัว

### Day 15 — Reporting + Coverage
- pytest-html: HTML report
- Allure: Professional report
- pytest-cov: Code coverage
- **Exercise Week 3:** Full API Test Suite (20+ tests)

---

## WEEK 4 — UI/E2E Testing with Playwright JS
> เป้าหมาย: เขียน Playwright test แบบ Production-grade

### Day 16 — Playwright Deep Setup
- TypeScript vs JavaScript mode
- `playwright.config.ts`
- baseURL, screenshot on failure, video
- **ฝึก:** Config สำหรับ 3 environments

### Day 17 — Locator Strategies (สำคัญมาก)
- Priority: getByRole > getByLabel > getByText > CSS
- `data-testid` attribute (Best Practice)
- Chaining locators
- **ฝึก:** Inspect หน้าเว็บ + เลือก Locator ที่ดีที่สุด

### Day 18 — Page Object Model (POM)
- BasePage class
- LoginPage, ProductPage, OrderPage
- Page fixtures
- **ฝึก:** แปลง test ทั้งหมดเป็น POM

### Day 19 — Advanced Playwright
- Intercept Network: `page.route()`
- Mock API response ใน UI test
- Visual comparison: `toHaveScreenshot()`
- Mobile viewport testing
- **ฝึก:** Mock API + เขียน visual test

### Day 20 — Playwright Allure Report
- allure-playwright integration
- Custom labels, links, attachments
- **Exercise Week 4:** Full E2E Suite (15+ scenarios)

---

## WEEK 5 — Robot Framework Professional
> เป้าหมาย: Robot Framework ระดับ Senior

### Day 21 — Robot Syntax Mastery
- Resource files (.resource)
- Variable files (variables.py)
- Suite Setup/Teardown
- **ฝึก:** Refactor test ใหม่ให้ clean

### Day 22 — RequestsLibrary (API)
- Create Session, GET, POST, DELETE
- Verify Response Body (JSON)
- **ฝึก:** เขียน API test suite ใน Robot

### Day 23 — SeleniumLibrary (Web)
- Browser keywords
- Wait Until Element Is Visible
- Input Text, Click Element
- **ฝึก:** Login + Add to cart flow

### Day 24 — Robot Data-Driven Testing
- Test Template
- Read test data จาก CSV/Excel
- **ฝึก:** 10 test cases จาก CSV

### Day 25 — Robot + CI
- Pabot: parallel execution
- Robot Framework Report + Allure
- **Exercise Week 5:** Full Robot Test Suite

---

## WEEK 6 — Performance Testing with JMeter
> เป้าหมาย: ทำ Load/Stress/Spike test ได้

### Day 26 — JMeter Architecture
- Thread Group, Sampler, Controller
- Timer, Assertion, Listener
- HTTP Request Defaults
- **ฝึก:** Basic load test 50 users

### Day 27 — JMeter Scripting
- CSV Data Set Config
- Variables: `${token}`, `${userId}`
- Regular Expression Extractor
- **ฝึก:** Parameterized login test

### Day 28 — Load Testing Patterns
- Load Test: Normal traffic
- Stress Test: Find breaking point
- Spike Test: Sudden surge
- Soak Test: Long duration
- **ฝึก:** สร้าง 4 test plans

### Day 29 — JMeter Analysis
- Response Time (Avg, 90th, 95th, 99th percentile)
- Throughput (TPS)
- Error Rate
- **ฝึก:** วิเคราะห์ผล + เขียน Report

### Day 30 — JMeter CLI + Dashboard
- `jmeter -n -t plan.jmx -l results.jtl`
- HTML Dashboard Report
- Integrate กับ CI
- **Exercise Week 6:** Performance Test Report

---

## WEEK 7 — Mobile Testing with Appium
> เป้าหมาย: เขียน Appium test Android App ได้

### Day 31 — Appium Setup
- Android SDK + Emulator
- Appium Server + Inspector
- `appium-python-client`
- **ฝึก:** Connect กับ Emulator

### Day 32 — Appium Locators
- ID, Accessibility ID, XPath, UiAutomator2
- Appium Inspector: หา element
- **ฝึก:** ระบุ locator 10 elements

### Day 33 — Appium Actions
- tap, send_keys, swipe, scroll
- Implicit/Explicit wait
- **ฝึก:** เขียน test login app

### Day 34 — Appium Framework
- Page Object Pattern สำหรับ Mobile
- iOS vs Android locator
- **ฝึก:** สร้าง MobilePage class

### Day 35 — Appium Advanced
- Hybrid App testing
- Screenshot on failure
- **Exercise Week 7:** Mobile Test Suite (5 scenarios)

---

## WEEK 8 — CI/CD + Final Project
> เป้าหมาย: มี Portfolio project พร้อม CI/CD

### Day 36-37 — GitHub Actions
- Workflow สำหรับแต่ละ tool
- Matrix testing (multiple Python versions)
- Artifact upload (reports)
- Scheduled run (cron)

### Day 38-39 — Final Project
- เลือก App จริงหรือ Demo App
- สร้าง Full Test Strategy:
  - API Tests (pytest)
  - E2E Tests (Playwright)
  - Performance Tests (JMeter)
  - Robot Tests (regression)
- CI/CD Pipeline ครบวงจร

### Day 40 — Demo + Portfolio
- README.md สมบูรณ์
- Demo run ทุก test suite
- สรุปสิ่งที่เรียนรู้
- วางแผนสิ่งที่จะพัฒนาต่อ

---

## เป้าหมายจบ 2 เดือน

- [x] Python Programming พื้นฐานแน่น
- [x] Postman + Newman + CI พร้อมใช้งาน
- [x] pytest API Framework สร้างเองได้
- [x] Playwright POM Pattern
- [x] Robot Framework Data-Driven
- [x] JMeter 4 patterns (Load/Stress/Spike/Soak)
- [x] Appium Mobile Testing เบื้องต้น
- [x] CI/CD Pipeline ด้วย GitHub Actions
- [x] Portfolio Project ใน GitHub พร้อม

---

## เปรียบเทียบ 2 แผน

| หัวข้อ              | 1 เดือน | 2 เดือน |
|--------------------|---------|---------|
| Python             | Basic   | Solid   |
| Postman            | Good    | Pro     |
| pytest API         | Basic   | Framework |
| Playwright         | Basic   | POM+Visual |
| Robot Framework    | Basic   | Data-Driven |
| JMeter             | Basic   | 4 patterns |
| Appium             | ไม่มี   | Basic   |
| CI/CD              | ไม่มี   | GitHub Actions |
| Portfolio          | Mini    | Full    |
