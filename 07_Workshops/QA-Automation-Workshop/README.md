# QA Automation Workshop
### สำหรับ QA Manual → QA Automation Engineer

---

## โครงสร้างไฟล์

```
QA-Automation-Workshop/
├── README.md                    ← ไฟล์นี้
├── PLAN_1MONTH.md               ← ตารางเรียน 1 เดือน
├── PLAN_2MONTHS.md              ← ตารางเรียน 2 เดือน
│
├── demo-app/                    ← Flask API สำหรับฝึก
│   ├── app.py                   ← รัน: python app.py
│   ├── requirements.txt
│   └── README.md                ← เอกสาร API ทั้งหมด
│
├── week02-api-testing/          ← API Testing
│   ├── test_api_python.py       ← pytest tests (60+ cases)
│   └── postman_collection.json  ← Import เข้า Postman
│
├── week03-ui-playwright/        ← Playwright JS
│   ├── tests/
│   │   └── login.spec.js        ← Test specs
│   ├── playwright.config.js
│   └── package.json
│
├── week04-robot-framework/      ← Robot Framework
│   └── api_tests.robot          ← Robot tests
│
├── week05-performance-jmeter/   ← JMeter
│   └── README_JMeter.md         ← คู่มือสร้าง Test Plan
│
├── week06-mobile-appium/        ← Appium Mobile
│   └── appium_basics.py         ← Python Appium tests
│
├── exercises/
│   └── EXERCISE_CHECKLIST.md    ← Checklist ติดตาม progress
│
└── cheatsheets/
    └── CHEATSHEET_ALL.md        ← Quick reference ทุก tools
```

---

## เริ่มต้นในวันแรก

### Step 1: รัน Demo API
```bash
cd demo-app
pip install -r requirements.txt
python app.py
# API พร้อมที่ http://localhost:5000
```

### Step 2: ทดสอบ API ด้วย browser
```
http://localhost:5000/health
http://localhost:5000/api/products
```

### Step 3: Import Postman Collection
1. เปิด Postman
2. Import → เลือก `week02-api-testing/postman_collection.json`
3. ตั้ง Variable: `base_url = http://localhost:5000`

### Step 4: รัน Python Tests
```bash
cd week02-api-testing
pip install pytest requests pytest-html
pytest test_api_python.py -v --html=report.html
```

### Step 5: รัน Playwright Tests
```bash
cd week03-ui-playwright
npm install
npx playwright install
npx playwright test
```

### Step 6: รัน Robot Framework
```bash
pip install robotframework robotframework-requests
robot week04-robot-framework/api_tests.robot
```

---

## สิ่งที่ต้องติดตั้ง

| Tool             | คำสั่งติดตั้ง                               |
|------------------|---------------------------------------------|
| Python           | https://www.python.org/downloads/           |
| Node.js          | https://nodejs.org/                         |
| pytest           | `pip install pytest requests pytest-html`   |
| Playwright       | `npm install -D @playwright/test`           |
| Robot Framework  | `pip install robotframework robotframework-requests` |
| Newman           | `npm install -g newman`                     |
| JMeter           | https://jmeter.apache.org/download_jmeter.cgi |
| Appium           | `npm install -g appium`                     |
| VS Code          | https://code.visualstudio.com/              |

---

## Tools Summary

| Tool             | ใช้ทำอะไร              | ภาษา       |
|------------------|------------------------|------------|
| Postman          | API Testing (GUI)      | JavaScript |
| Newman           | Postman ใน CLI/CI      | JavaScript |
| pytest + requests| API Testing (Code)     | Python     |
| Playwright       | API + UI/E2E Testing   | JavaScript |
| Robot Framework  | API + Web Testing      | Robot      |
| JMeter           | Performance Testing    | GUI/XML    |
| Appium           | Mobile Testing         | Python     |

---

## แผนเรียน

| แผน     | ระยะเวลา | เวลา/วัน | เป้าหมาย          |
|---------|---------|---------|------------------|
| 1 เดือน | 20 วัน   | 6 ชม.   | Apply งานได้ทันที  |
| 2 เดือน | 40 วัน   | 6 ชม.   | Senior QA Automation |

อ่านรายละเอียด: [PLAN_1MONTH.md](PLAN_1MONTH.md) | [PLAN_2MONTHS.md](PLAN_2MONTHS.md)
