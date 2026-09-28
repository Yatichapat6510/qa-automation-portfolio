# Robot Framework QA Automation

> **English summary:** UI (SeleniumLibrary) and API (RequestsLibrary) suites for Sauce Demo and a public REST API, built with reusable keyword resources and tagged `smoke` / `regression` / `integration`. Install with `pip install -r requirements.txt`, run with `robot -d results tests/`, smoke only with `-i smoke`. CI: [`.github/workflows/robot.yml`](../../.github/workflows/robot.yml). Folders `sandbox/`, `practice/` and `e2e-flow/` are exercises and are not part of the CI claim.

ชุดทดสอบอัตโนมัติสำหรับทดสอบ UI และ API ด้วย Robot Framework โดยครอบคลุมการเข้าสู่ระบบ ตะกร้าสินค้า การตรวจสอบราคา และ REST API

## โครงสร้างโปรเจกต์

```text
web/robot-framework/
├── tests/          # ชุดทดสอบ UI และ API
├── resources/      # keywords และตัวแปรที่ใช้ร่วมกัน
├── test_data/      # Python libraries และข้อมูลประกอบการทดสอบ
├── results/        # ผลลัพธ์จากการรันทดสอบ (ไม่เก็บใน Git)
├── requirements.txt
└── README.md
```

โฟลเดอร์ `sandbox/`, `practice/` และ `e2e-flow/` ใช้สำหรับแบบฝึกหัดและการทดลองแยกจากชุดทดสอบหลักใน `tests/`.

## ติดตั้ง

แนะนำให้ใช้ Python 3.11 ขึ้นไปและ virtual environment:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## รันทดสอบ

รันทุกชุดทดสอบและบันทึกผลไว้ใน `results/`:

```powershell
robot -d results tests/
```

รันเฉพาะ Smoke tests:

```powershell
robot -d results -i smoke tests/
```

รันเฉพาะ API tests:

```powershell
robot -d results tests/api/
```

หลังรันเสร็จ ให้เปิด `results/report.html` เพื่อดูสรุป และ `results/log.html` เพื่อดูรายละเอียดการทำงานของแต่ละขั้นตอน

## CI

เมื่อ push หรือเปิด pull request, GitHub Actions จะติดตั้ง dependencies รันชุดทดสอบ และแนบไฟล์ใน `results/` เป็น build artifact อัตโนมัติ โดย workflow อยู่ที่ `../../.github/workflows/robot.yml` (รากของ Git repository).
