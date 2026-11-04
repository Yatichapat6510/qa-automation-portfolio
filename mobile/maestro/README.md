# Maestro Mobile Flows (Android)

[![Mobile Android CI](https://github.com/Yatichapat6510/qa-automation-portfolio/actions/workflows/mobile.yml/badge.svg)](https://github.com/Yatichapat6510/qa-automation-portfolio/actions/workflows/mobile.yml)

Flow แบบ YAML (declarative) สำหรับแอป Sauce Labs *My Demo App* (`com.saucelabs.mydemoapp.android`)
ใช้ test case ชุดเดียวกับโมดูล [Appium](../appium/) เพื่อเทียบความกระชับและความเสถียรของสองเครื่องมือบนแอปเดียวกัน
รายละเอียด test case อยู่ที่ [`../appium/docs/test-cases.md`](../appium/docs/test-cases.md)

## โครงสร้าง

```text
mobile/maestro/
├── flow_test.yaml                     # smoke: เปิดแอปได้
└── flows/
    ├── config.yaml                    # กำหนดให้รันเฉพาะไฟล์ tc_*.yaml
    ├── tc_mob_001 ... tc_mob_005      # ชุดหลัก (Login และตะกร้าสินค้า)
    ├── subflows/                      # ขั้นตอนที่ใช้ซ้ำ: เปิดหน้า Login, กรอกข้อมูล Login
    └── known_defects/                 # TC-MOB-006 ยืนยัน BUG-004 (คาดว่าจะ fail จนกว่าบั๊กจะถูกแก้)
```

## สิ่งที่ต้องมี

- [Maestro CLI](https://maestro.mobile.dev) และ Java 17+
- Android emulator หรืออุปกรณ์ที่แสดงใน `adb devices` และติดตั้งแอปแล้ว

## วิธีรัน (จาก root ของ repository)

```bash
maestro test mobile/maestro/flows --test-output-dir mobile/maestro/results   # รันชุดหลักทั้งหมด
maestro test mobile/maestro/flows --include-tags=smoke     # รันเฉพาะ tag
maestro test mobile/maestro/flows --format junit --output mobile/maestro/results/report.xml
maestro test mobile/maestro/flows/known_defects            # รันเคส defect แยก
```

- Screenshot จาก `takeScreenshot` และ log ของแต่ละ flow จะอยู่ในโฟลเดอร์ที่ระบุด้วย `--test-output-dir` (ถ้าไม่ระบุ Maestro 2.x จะเก็บไว้ที่ `~/.maestro/tests/`)
- ใช้ `maestro studio` ตรวจ selector กับแอปที่ติดตั้งอยู่ได้ทันที

## ข้อสังเกตเมื่อเทียบกับ Appium

| หัวข้อ | Maestro | Appium |
| --- | --- | --- |
| ความยาวต่อเคส | 15–30 บรรทัด YAML | Page Object + test function |
| การรอ element | รอให้อัตโนมัติ | ต้องเขียน explicit wait เอง |
| Logic ซับซ้อน (loop, parametrize) | จำกัด ใช้ subflow + env แทน | เขียนได้เต็มที่ |
| เคส Known Defect | แยกโฟลเดอร์ | `xfail` / keyword `Known Defect Check` |
