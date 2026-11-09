# Maestro Mobile Flows (Android)

[![Mobile Android CI](https://github.com/Yatichapat6510/qa-automation-portfolio/actions/workflows/mobile.yml/badge.svg)](https://github.com/Yatichapat6510/qa-automation-portfolio/actions/workflows/mobile.yml)

ชุดทดสอบอัตโนมัติด้วย [Maestro](https://maestro.mobile.dev) (YAML แบบ declarative) สำหรับแอป Sauce Labs *My Demo App* (`com.saucelabs.mydemoapp.android`)
ใช้ test case ชุดเดียวกับโมดูล [Appium](../appium/) เพื่อเทียบความกระชับและความเสถียรของสองเครื่องมือบนแอปเดียวกัน
รายละเอียด test case อยู่ที่ [`../appium/docs/test-cases.md`](../appium/docs/test-cases.md)

## ภาพรวม

| รายการ | รายละเอียด |
| --- | --- |
| เครื่องมือ | Maestro CLI 2.x (รันบนเครื่องด้วย 2.8.0) |
| แอปที่ทดสอบ | Sauce Labs My Demo App (Android) |
| ขอบเขต | Smoke, Login (positive / negative / edge), ตะกร้าสินค้า |
| ชุดหลัก | 6 flow (1 smoke + 5 test case) ต้องผ่านทั้งหมด |
| Known defect | TC-MOB-006 ยืนยัน [BUG-004](../../docs/examples/bug-reports/BUG-004-bolt-tshirt-adds-ten-units.md) แยกไว้ คาดว่าจะ fail จนกว่าบั๊กจะถูกแก้ |
| CI | GitHub Actions บน Android emulator ([`mobile.yml`](../../.github/workflows/mobile.yml)) รันร่วมกับชุด Appium |

## โครงสร้างโฟลเดอร์

```text
mobile/maestro/
├── flows/
│   ├── config.yaml                    # กำหนดไฟล์ที่นับเป็นเทสต์ และให้ smoke รันก่อน
│   ├── smoke_app_launch.yaml          # Smoke: เปิดแอปแล้วเห็นหน้า Products
│   ├── tc_mob_001 ... tc_mob_005      # ชุดหลัก (Login และตะกร้าสินค้า)
│   ├── subflows/                      # ขั้นตอนที่ใช้ซ้ำ (เรียกผ่าน runFlow เท่านั้น)
│   │   ├── launch_app.yaml            #   เปิดแอป state สะอาด + ให้สิทธิ์ + รอหน้าพร้อม
│   │   ├── wait_app_ready.yaml        #   รอหน้า Products และเรียกตัวปิด pop-up
│   │   ├── dismiss_system_popups.yaml #   ปิด pop-up ของระบบ (compat dialog, permission)
│   │   ├── open_login.yaml            #   ไปที่หน้า Login ผ่านเมนู
│   │   └── submit_login.yaml          #   กรอก USERNAME/PASSWORD แล้วกด Login
│   └── known_defects/                 # TC-MOB-006 (BUG-004) แยกออกจากชุดหลัก
├── data/
│   └── test_users.js                  # ข้อมูลผู้ใช้ทดสอบ แก้ที่เดียวใช้ได้ทุก flow
├── scripts/
│   └── run_tests.sh                   # รันชุดหลัก + known defect และสร้างรายงานใน results/
└── results/                           # ผลรัน (JUnit, screenshot, log) ไม่ commit
```

หลักการแยกโฟลเดอร์

- `flows/` มีเฉพาะสิ่งที่ Maestro รันได้ ไฟล์ `tc_*` และ `smoke_*` คือเทสต์ ส่วน `subflows/` ไม่ใช่เทสต์ (`config.yaml` ไม่รวมโฟลเดอร์นี้)
- `data/` เก็บข้อมูลทดสอบ flow โหลดผ่าน `onFlowStart` จึงไม่มีรหัสผ่านฝังอยู่ในตัวเทสต์
- `scripts/` เก็บคำสั่งรันที่ใช้ร่วมกันระหว่างเครื่อง local และ CI เพื่อให้สองที่นี้รันด้วยวิธีเดียวกัน

## กลยุทธ์ลด flaky และจัดการ pop-up

1. **เปิดแอปด้วยวิธีเดียวกันทุกเทสต์** ผ่าน `subflows/launch_app.yaml` (`clearState` + `permissions: all: allow`) ทำให้ permission dialog ส่วนใหญ่ไม่เด้งตั้งแต่ต้น
2. **รอสถานะ ไม่รอเวลา** ใช้ `extendedWaitUntil` รอให้หน้าพร้อม ไม่ใช้ `sleep` หรือ timeout ตายตัว
3. **ยืนยันหน้าปลายทางก่อนทำขั้นถัดไป** เช่น `assertVisible` สินค้าที่เปิดถูกตัวก่อนกดเพิ่มลงตะกร้า
4. **ปิด pop-up ของระบบแบบมีเงื่อนไข** ใน `dismiss_system_popups.yaml` ด้วย `runFlow: when: visible` ซึ่งตรวจแล้วจบทันที ต่างจาก `optional: true` ที่ต้องรอ timeout ทุกครั้งที่ไม่เจอ element
5. **ไม่ปิด dialog แครช/ANR โดยอัตโนมัติ** เพราะเป็นบั๊กจริงของแอป (เช่น [BUG-005](../../docs/examples/bug-reports/BUG-005-catalog-crash-on-product-tap.md)) การปิดจะทำให้เทสต์ผ่านทั้งที่ไม่ควรผ่าน
6. **แยก known defect ออกจากชุดหลัก** ผลของชุดหลักจึงเป็นสีเขียวได้จริงเมื่อไม่มีการถดถอย

pop-up ที่รองรับตอนนี้: `Android App Compatibility` (Android 15+) และ runtime permission ของ Permission Controller
ทดสอบกับ permission dialog จริงแล้ว (เมนู Geo Location ตอนเปิดแอปด้วย `permissions: all: deny`) ถ้าต้องการรองรับ pop-up ใหม่ ให้เพิ่ม block `runFlow: when:` ในไฟล์เดียวกัน

## สิ่งที่ต้องมี

- [Maestro CLI](https://maestro.mobile.dev/getting-started/installing-maestro) 2.x และ Java 17 ขึ้นไป
- Android SDK (`adb` ใน PATH)
- Android emulator หรืออุปกรณ์จริงที่แสดงใน `adb devices` และติดตั้งแอป My Demo App แล้ว ([ดาวน์โหลด APK](https://github.com/saucelabs/my-demo-app-android/releases))

## วิธีรันบนเครื่อง

```bash
# 1) เปิด emulator แล้วตรวจว่าเห็นอุปกรณ์
adb devices

# 2) ติดตั้งแอป (ครั้งแรกเท่านั้น)
adb install -r path/to/mda-x.y.z.apk

# 3) รันชุดหลัก + known defect ผ่านสคริปต์ (ผลอยู่ใน mobile/maestro/results/)
bash mobile/maestro/scripts/run_tests.sh
bash mobile/maestro/scripts/run_tests.sh smoke        # รันเฉพาะ tag
bash mobile/maestro/scripts/run_tests.sh login,cart   # หลาย tag (OR)
```

หรือเรียก Maestro โดยตรง (จาก root ของ repository)

```bash
maestro test mobile/maestro/flows                               # ชุดหลัก
maestro test mobile/maestro/flows --include-tags=smoke          # เฉพาะ tag
maestro test mobile/maestro/flows/tc_mob_001_login_valid_user.yaml   # เคสเดียว
maestro test mobile/maestro/flows/known_defects                 # เคส defect
maestro studio                                              # ตรวจ selector กับแอปที่เปิดอยู่
```

- ผลรันของสคริปต์: `results/report.xml` (JUnit), `results/main/<timestamp>/` (screenshot, `commands.json`, log) และ `results/known_defects/`
- สคริปต์คืน exit code 0 เมื่อชุดหลักผ่านทั้งหมด ผล known defect ไม่มีผลต่อ exit code

## ผลรันล่าสุด

รันบน emulator `Pixel_7_API_34` (Android 14) ด้วย Maestro 2.8.0 วันที่ 2026-11-07

| Flow | ผล | เวลา |
| --- | --- | --- |
| SMOKE App launches to Products screen | ผ่าน | 14 วินาที |
| TC-MOB-001 Login with valid credentials | ผ่าน | 48 วินาที |
| TC-MOB-002 Login with locked-out user | ผ่าน | 38 วินาที |
| TC-MOB-003 Login with empty password | ผ่าน | 31 วินาที |
| TC-MOB-004 Login with whitespace-only username | ผ่าน | 34 วินาที |
| TC-MOB-005 Add product with quantity 2 to cart | ผ่าน | 27 วินาที |
| **ชุดหลัก** | **6/6 ผ่าน** | **3 นาที 11 วินาที** |
| TC-MOB-006 Bolt T-Shirt quantity (known defect BUG-004) | ล้มตามที่คาด (badge แสดง 10 แทน 1) | 46 วินาที |

## CI

Workflow [`mobile.yml`](../../.github/workflows/mobile.yml) ทำงานเมื่อ push เข้า `main` หรือเปิด pull request ที่แตะไฟล์ใน `mobile/` และรัน regression ทุกวันจันทร์

1. ติดตั้ง Appium + UiAutomator2, Maestro CLI และ dependency ของ Python
2. ดาวน์โหลด APK ล่าสุดจาก release ของแอป
3. เปิด Android emulator (API 31) แล้วเรียก [`mobile/scripts/run-android-ci.sh`](../scripts/run-android-ci.sh) ซึ่งรัน pytest → Robot Framework → `mobile/maestro/scripts/run_tests.sh` (สคริปต์เดียวกับที่ใช้บนเครื่อง)
4. รวมผลเป็น Allure Report และอัปโหลด artifact `mobile-test-results` (ผลของ Maestro อยู่ในโฟลเดอร์ `maestro/`)

## ข้อสังเกตเมื่อเทียบกับ Appium

| หัวข้อ | Maestro | Appium |
| --- | --- | --- |
| ความยาวต่อเคส | 15–30 บรรทัด YAML | Page Object + test function |
| การรอ element | รอให้อัตโนมัติ | ต้องเขียน explicit wait เอง |
| Logic ซับซ้อน (loop, parametrize) | จำกัด ใช้ subflow + env + JS เล็กๆ แทน | เขียนได้เต็มที่ |
| เคส Known Defect | แยกโฟลเดอร์ | `xfail` / keyword `Known Defect Check` |

## แนวทางขยายชุดทดสอบ

- **แยก environment**: ส่งค่าผ่าน `maestro test -e APP_ENV=staging ...` แล้วให้ `data/test_users.js` เลือกชุดข้อมูลตามค่านั้น
- **จัดการข้อมูลลับ**: ถ้าเปลี่ยนไปทดสอบแอปที่มีบัญชีจริง ให้เก็บรหัสผ่านใน GitHub Secrets แล้วส่งเข้าด้วย `-e PASSWORD=${{ secrets.QA_PASSWORD }}` ห้าม commit ลงไฟล์
- **รันแบบแบ่งระดับ**: pull request รันเฉพาะ `--include-tags=smoke` เพื่อให้ผลเร็ว ส่วน `main` และรอบกลางคืน (cron) รันชุดเต็ม
- **รันขนาน**: เมื่อเทสต์เพิ่มขึ้นให้ใช้ `--shard-split` กับหลาย emulator เพื่อลดเวลารวม
