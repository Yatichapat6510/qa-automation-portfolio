# Test Cases — Sauce Labs My Demo App (Android)

| รายการ | ค่า |
| --- | --- |
| แอปที่ทดสอบ | Sauce Labs My Demo App (`com.saucelabs.mydemoapp.android`) |
| แพลตฟอร์ม | Android Emulator Pixel 7 API 34 (`emulator-5554`), UiAutomator2 / Maestro 2.8 |
| รันล่าสุด | 2026-11-04 แอปรุ่น 2.2.0: pytest 5 passed + 1 xfailed, Robot 6 passed + 1 skipped, Maestro 5/5 passed (TC-MOB-006 fail ตามที่คาด) |
| ขอบเขต | Login (Positive / Negative / Edge), การเพิ่มสินค้าลงตะกร้า และ defect ที่พบ 1 รายการ |
| Automation | Appium + pytest และ Appium + Robot Framework (`mobile/appium/tests/`), Maestro (`mobile/maestro/flows/`) |

## บัญชีทดสอบ

| Username | Password | พฤติกรรมของแอป |
| --- | --- | --- |
| `bod@example.com` | `10203040` | Login สำเร็จ |
| `alice@example.com` | `10203040` | บัญชีถูกล็อก แสดงข้อความ error |

> **ข้อสังเกตจากการวิเคราะห์ source code ของแอป:** แอปเดโมนี้ไม่ได้ตรวจสอบ username/password กับ backend จริง ข้อมูลใดก็ตามที่ไม่ว่างและไม่ใช่ `alice@example.com` จะ login ผ่านทั้งหมด จึงไม่มี test case แบบ "รหัสผ่านผิด" เพราะผลลัพธ์จะไม่สะท้อนพฤติกรรมของระบบจริง ชุดทดสอบนี้จึงเน้น validation ฝั่ง client และกรณีบัญชีถูกล็อกแทน

## รายการ Test Case

| Test Case ID | Description | Pre-conditions | Steps | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| TC-MOB-001 | **[Positive]** Login ด้วยบัญชีที่ถูกต้อง | 1. ติดตั้งแอปบน emulator แล้ว<br>2. เปิดแอปใหม่ (state ว่าง ยังไม่ login) | 1. แตะปุ่มเมนู (View menu)<br>2. แตะเมนู "Log In"<br>3. กรอก Username: `bod@example.com`<br>4. กรอก Password: `10203040`<br>5. แตะปุ่ม "Login"<br>6. เปิดเมนูอีกครั้ง | - แอปพากลับไปหน้า Products (รายการสินค้า)<br>- ในเมนูแสดง "Log Out" แทน "Log In" | ตรงตาม Expected Result | Pass |
| TC-MOB-002 | **[Negative]** Login ด้วยบัญชีที่ถูกล็อก | 1. ติดตั้งแอปบน emulator แล้ว<br>2. อยู่ที่หน้า Login | 1. กรอก Username: `alice@example.com`<br>2. กรอก Password: `10203040`<br>3. แตะปุ่ม "Login" | - แสดงข้อความใต้ช่อง Password: "Sorry this user has been locked out."<br>- ยังคงอยู่ที่หน้า Login ไม่เข้าสู่ระบบ | ตรงตาม Expected Result | Pass |
| TC-MOB-003 | **[Negative]** Login โดยไม่กรอก Password | 1. ติดตั้งแอปบน emulator แล้ว<br>2. อยู่ที่หน้า Login | 1. กรอก Username: `bod@example.com`<br>2. เว้นช่อง Password ว่าง<br>3. แตะปุ่ม "Login" | - แสดงข้อความใต้ช่อง Password: "Enter Password"<br>- ยังคงอยู่ที่หน้า Login | ตรงตาม Expected Result | Pass |
| TC-MOB-004 | **[Edge]** Username มีแต่ช่องว่าง (whitespace) | 1. ติดตั้งแอปบน emulator แล้ว<br>2. อยู่ที่หน้า Login | 1. กรอก Username เป็นช่องว่าง 3 ตัว (`"   "`)<br>2. กรอก Password: `10203040`<br>3. แตะปุ่ม "Login" | - แอป trim ค่าแล้วถือว่า Username ว่าง<br>- แสดงข้อความใต้ช่อง Username: "Username is required"<br>- ยังคงอยู่ที่หน้า Login | ตรงตาม Expected Result | Pass |
| TC-MOB-005 | **[Positive / Edge]** เพิ่มสินค้าลงตะกร้าโดยเพิ่มจำนวนเป็น 2 ชิ้น | 1. ติดตั้งแอปบน emulator แล้ว<br>2. ตะกร้าว่าง<br>3. อยู่ที่หน้า Products (เรียงตามชื่อ A→Z ซึ่งเป็นค่าเริ่มต้น) | 1. แตะรูปสินค้า "Sauce Labs Backpack"<br>2. แตะปุ่ม "+" เพื่อเพิ่มจำนวนเป็น 2<br>3. แตะปุ่ม "Add To Cart"<br>4. แตะไอคอนตะกร้า (View cart) | - Badge บนไอคอนตะกร้าแสดง `2`<br>- หน้า My Cart แสดงสินค้า "Sauce Labs Backpack"<br>- จำนวนรวมแสดง "2 Items"<br>- ราคารวมแสดง `$ 59.98` (29.99 × 2) | ตรงตาม Expected Result | Pass |
| TC-MOB-006 | **[Negative / Defect]** เพิ่ม "Sauce Labs Bolt T-Shirt" 1 ชิ้นต้องได้ 1 ชิ้น | 1. ติดตั้งแอปบน emulator แล้ว<br>2. ตะกร้าว่าง<br>3. อยู่ที่หน้า Products | 1. เรียงสินค้าแบบ "Price - Ascending" (ป้องกันแอปแครชตาม BUG-005)<br>2. แตะรูปสินค้า "Sauce Labs Bolt T-Shirt" (ลำดับที่ 3 ไม่ใช่รุ่นที่มีสีในวงเล็บ)<br>3. ไม่ปรับจำนวน (ค่าเริ่มต้น 1)<br>4. แตะปุ่ม "Add To Cart" | - Badge บนไอคอนตะกร้าแสดง `1` | Badge แสดง `10` แทน `1` ([screenshot](../../../assets/images/bug-004-bolt-tshirt-badge-10.png)) | Fail – Known Defect ([BUG-004](../../../docs/examples/bug-reports/BUG-004-bolt-tshirt-adds-ten-units.md)) |

## การ map Test Case กับ Automation

| Test Case ID | Appium (pytest) | Appium (Robot Framework) | Maestro Flow |
| --- | --- | --- | --- |
| TC-MOB-001 | `tests/test_login.py::test_tc_mob_001_login_with_valid_credentials` | `tests/login.robot` | `flows/tc_mob_001_login_valid_user.yaml` |
| TC-MOB-002 | `tests/test_login.py::test_login_shows_validation_error[TC-MOB-002-locked-out-user]` | `tests/login.robot` | `flows/tc_mob_002_login_locked_user.yaml` |
| TC-MOB-003 | `tests/test_login.py::test_login_shows_validation_error[TC-MOB-003-empty-password]` | `tests/login.robot` | `flows/tc_mob_003_login_empty_password.yaml` |
| TC-MOB-004 | `tests/test_login.py::test_login_shows_validation_error[TC-MOB-004-whitespace-username]` | `tests/login.robot` | `flows/tc_mob_004_login_whitespace_username.yaml` |
| TC-MOB-005 | `tests/test_cart.py::test_tc_mob_005_add_product_with_quantity_updates_cart` | `tests/cart.robot` | `flows/tc_mob_005_add_to_cart_quantity.yaml` |
| TC-MOB-006 | `tests/test_known_defects.py` (xfail strict) | `tests/known_defects.robot` (Known Defect Check) | `flows/known_defects/tc_mob_006_bolt_tshirt_quantity.yaml` (รันแยก) |

## Defect ที่พบระหว่างรันจริง

| Bug ID | สรุป | ผลต่อชุดทดสอบ |
| --- | --- | --- |
| [BUG-004](../../../docs/examples/bug-reports/BUG-004-bolt-tshirt-adds-ten-units.md) | Bolt T-Shirt ถูกเพิ่ม 10 ชิ้นเสมอ | ยืนยันโดย TC-MOB-006 |
| [BUG-005](../../../docs/examples/bug-reports/BUG-005-catalog-crash-on-product-tap.md) | แอปแครชเมื่อแตะสินค้าลำดับที่ 2 หรือ 7 ขึ้นไป | TC-MOB-006 ต้องเรียงตามราคาก่อนเปิดสินค้า |

## วิธีจัดการเคส Known Defect

TC-MOB-006 ยืนยันบั๊กที่ยังไม่ถูกแก้ จึงตั้งค่าให้ไม่ทำให้ CI แดง แต่ยังมองเห็นได้ในรายงาน

- **pytest:** `xfail(strict=True, raises=AssertionError)` บั๊กยังอยู่จะแสดงเป็น XFAIL ถ้าบั๊กถูกแก้จะกลายเป็น fail เพื่อเตือนให้ถอด marker ถ้าล้มด้วยสาเหตุอื่น (เช่น หา element ไม่เจอ) จะยังเป็น fail
- **Robot Framework:** keyword `Known Defect Check` ครอบเฉพาะขั้นตรวจผลสุดท้าย บั๊กยังอยู่จะแสดงเป็น SKIP พร้อมรหัสบั๊ก ถ้าล้มตั้งแต่ setup หรือระหว่างทางจะยังเป็น FAIL
- **Maestro:** แยกไว้ในโฟลเดอร์ `known_defects/` ซึ่ง `config.yaml` ไม่ได้รวมไว้ในชุดหลัก
