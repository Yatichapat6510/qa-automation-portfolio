# Exercise Checklist — QA Automation Workshop

ทำเครื่องหมาย [x] เมื่อทำสำเร็จแต่ละข้อ

---

## Week 1 / Day 1-5 — API Testing

### Postman
- [ ] Import `postman_collection.json` เข้า Postman ได้
- [ ] ตั้งค่า Environment Variables (base_url, token) ได้
- [ ] รัน Collection ทั้งหมดแล้วผ่านทุก test
- [ ] ติดตั้ง Newman (`npm install -g newman`)
- [ ] รัน `newman run postman_collection.json` สำเร็จ
- [ ] Export HTML Report จาก Newman ได้

### Python + pytest
- [ ] ติดตั้ง `pip install pytest requests pytest-html` สำเร็จ
- [ ] รัน `python demo-app/app.py` แล้ว API ทำงานได้
- [ ] รัน `pytest week02-api-testing/test_api_python.py -v` สำเร็จ
- [ ] test ผ่านอย่างน้อย 20 cases
- [ ] สร้าง HTML report: `pytest --html=report.html` ได้

---

## Week 2 / Day 6-10 — Playwright

- [ ] ติดตั้ง Node.js ได้
- [ ] รัน `npm install` ใน `week03-ui-playwright/` สำเร็จ
- [ ] `npx playwright install` สำเร็จ
- [ ] รัน `npx playwright test` สำเร็จ
- [ ] test ผ่านอย่างน้อย 10 cases
- [ ] ดู HTML report: `npx playwright show-report` ได้
- [ ] เพิ่ม test case Chain Tests (Login → ใช้ token) เองได้

---

## Week 3 / Day 11-13 — Robot Framework

- [ ] ติดตั้ง `pip install robotframework robotframework-requests` สำเร็จ
- [ ] รัน `robot week04-robot-framework/api_tests.robot` สำเร็จ
- [ ] test ผ่านอย่างน้อย 10 cases
- [ ] ดู Robot report ที่ `report.html` ได้
- [ ] เข้าใจ Keyword, Variable, Test Template
- [ ] เขียน Data-Driven test เองได้

---

## Week 4 / Day 14-15 — JMeter

- [ ] ดาวน์โหลดและเปิด JMeter ได้
- [ ] สร้าง Thread Group ได้
- [ ] สร้าง HTTP Request Sampler ได้
- [ ] เพิ่ม Response Assertion ได้
- [ ] รัน Load Test 50 users สำเร็จ
- [ ] ดู Aggregate Report ได้
- [ ] Export HTML Dashboard ได้
- [ ] บันทึก: Average / 90th Percentile / TPS / Error Rate

---

## Mini Project (Week 4)

- [ ] เลือก 1 scenario และเขียน Test Plan
- [ ] เขียน API Tests (pytest) อย่างน้อย 15 cases
- [ ] เขียน Playwright Tests อย่างน้อย 5 scenarios
- [ ] เขียน Robot Framework Tests อย่างน้อย 5 cases
- [ ] ทำ JMeter Load Test แล้ว report ผล
- [ ] รวม report ทั้งหมดใน 1 folder

---

## สรุปทักษะที่ประเมินตัวเอง (ให้คะแนน 1-5)

| ทักษะ                     | คะแนน |
|--------------------------|-------|
| Postman + Newman         |       |
| Python pytest            |       |
| Playwright (API)         |       |
| Robot Framework          |       |
| JMeter Performance       |       |
| เขียน Test Case ที่ดี     |       |
| วิเคราะห์ผล Test ได้      |       |
| เขียน Test Report ได้     |       |

---

## คำถามฝึกคิด (ให้เขียนตอบเอง)

1. เมื่อไหร่ควรใช้ Postman แทน pytest?
2. ความแตกต่างระหว่าง Load Test กับ Stress Test คืออะไร?
3. ถ้า API คืน 200 แต่ข้อมูลผิด — เป็น Bug ไหม? ทดสอบยังไง?
4. ทำไม Robot Framework ถึงเหมาะกับทีมที่ไม่ได้เขียนโค้ดเป็น?
5. สิ่งที่ยากที่สุดในการทำ Automation Testing คืออะไร?
