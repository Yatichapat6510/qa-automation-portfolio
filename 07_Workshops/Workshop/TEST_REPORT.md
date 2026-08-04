# 🎓 QA Workshop — Beginner Edition
> ระดับ: มือใหม่ (Beginner) | Target: Demo API & Web สาธารณะ | April 2026

---

## 📁 โครงสร้างไฟล์ทั้งหมด

```
beginner-qa/
│
├── 📄 TEST_REPORT.md                          ← ไฟล์นี้ (อ่านก่อน!)
│
├── 📋 docs/
│   └── QA_Workshop_TestPlan.docx              ← Test Plan ฉบับสมบูรณ์ (Word)
│
├── 🔵 postman/
│   └── beginner_postman_collection.json       ← Import เข้า Postman ได้เลย
│
├── 🔴 jmeter/
│   └── beginner_load_test.jmx                 ← เปิดด้วย JMeter GUI
│
├── 🟡 robot-framework/
│   ├── tests/
│   │   └── web_tests.robot                    ← Test Suite ภาษาไทย อ่านง่าย
│   └── resources/
│       ├── locators.resource                  ← Element Locators
│       └── keywords.resource                  ← Reusable Keywords
│
├── 🟣 playwright/
│   └── tests/
│       └── saucedemo.spec.ts                  ← E2E Tests (TypeScript + POM)
│
├── 📱 appium/
│   ├── tests/
│   │   └── mobile_tests.robot                 ← Mobile Test Suite
│   └── resources/
│       └── mobile_keywords.resource           ← Mobile Keywords
│
├── 🟠 sql/
│   └── beginner_exercises.sql                 ← Schema + Labs + Validation Queries
│
└── ⚙️ .github/workflows/
    └── qa_tests.yml                           ← CI/CD Pipeline
```

---

## 🚀 เริ่มต้นใน 5 นาที

### Option A: Postman (แนะนำสำหรับวันแรก)
```
1. ดาวน์โหลด Postman: https://www.postman.com/downloads
2. File → Import → เลือก postman/beginner_postman_collection.json
3. กด Send บน "1A: ดูบทความทั้งหมด"
4. ดูผลที่ Tab "Test Results" ✅
```

### Option B: SQL (ไม่ต้องติดตั้งอะไรเพิ่ม)
```
1. ดาวน์โหลด DB Browser: https://sqlitebrowser.org
2. New Database → บันทึกเป็น qa_beginner.db
3. Execute SQL Tab → เปิดไฟล์ sql/beginner_exercises.sql
4. กด Execute ✅
```

---

## 📊 Test Cases Summary

| Tool | จำนวน TC | Lab | สิ่งที่ฝึก |
|------|---------|-----|-----------|
| **Postman** | 7 TCs (+ 2 Quiz) | STEP 1-5 | GET/POST/PUT/DELETE, Assertions, Chaining |
| **JMeter** | 2 Labs | LAB 1-2 | Load 1 user, Load 5 users, Response Assertion |
| **Robot Framework** | 8 TCs | บทที่ 1-3 | Login, Products, E2E Checkout (ภาษาไทย) |
| **Playwright** | 11 TCs | บทที่ 1-3 | POM, Login, Cart, E2E Checkout (TypeScript) |
| **Appium** | 5 TCs | บทที่ 1-2 | Launch, Tap, Scroll, Input, Back Button |
| **SQL** | 4 Labs + 5 Checks + 3 Quiz | LAB 1-4 | SELECT, JOIN, Aggregate, Data Validation |

---

## 🧰 Installation Checklist

```
☐ Postman        → https://www.postman.com/downloads
☐ JMeter         → https://jmeter.apache.org/download_jmeter.cgi
☐ Python 3.x     → https://www.python.org
☐ Robot FW       → pip install robotframework robotframework-seleniumlibrary
☐ ChromeDriver   → ต้องตรงกับ Chrome version
☐ Node.js        → https://nodejs.org
☐ Playwright     → npm install && npx playwright install chromium
☐ DB Browser     → https://sqlitebrowser.org (สำหรับ SQL)
☐ Appium*        → npm install -g appium + appium driver install uiautomator2
```
> *Appium ต้องการ Android Studio + Emulator เพิ่มเติม

---

## 🏃 วิธีรัน Quick Reference

| Tool | Command |
|------|---------|
| Postman | Import collection → กด Send |
| JMeter | `jmeter -t jmeter/beginner_load_test.jmx` |
| Robot (Chrome) | `robot --variable BROWSER:chrome robot-framework/tests/web_tests.robot` |
| Robot (Headless) | `robot --variable BROWSER:headlesschrome robot-framework/tests/web_tests.robot` |
| Playwright | `cd playwright && npx playwright test` |
| Playwright Report | `npx playwright show-report` |
| SQL | `sqlite3 qa_beginner.db < sql/beginner_exercises.sql` |

---

## 💡 Tips สำหรับมือใหม่

**ลำดับการเรียน (แนะนำ):**

1. **Postman** → เข้าใจ API พื้นฐานก่อน
2. **SQL** → เรียนรู้การ Query ข้อมูล
3. **Robot Framework** → UI Testing อ่านง่าย
4. **Playwright** → UI Testing แบบ TypeScript
5. **JMeter** → Performance Testing
6. **Appium** → Mobile Testing (ต้องมี Emulator)

**สิ่งที่ทุก Test File มี:**
- 📝 คำอธิบาย Thai ทุก step
- ✅ Happy Path (กรณีปกติ)
- ❌ Negative Test (กรณีผิดพลาด)
- 🏆 Quiz ลองทำเอง
