# BUG-005: แอปแครชเมื่อแตะสินค้าลำดับที่ 2 หรือลำดับที่ 7 ขึ้นไปในหน้า Products

| Field | Value |
| --- | --- |
| Environment | Sauce Labs My Demo App (Android) `com.saucelabs.mydemoapp.android` รุ่น 2.2.0, Android Emulator Pixel 7 |
| Account | ไม่ต้อง login |
| Severity | Critical |
| Priority | P0 |
| Type | Crash / หน้ารายการสินค้า |
| พบระหว่าง | รัน TC-MOB-006 ด้วย Appium (pytest) |

## สรุป

ในหน้า Products การแตะรูปสินค้าเพื่อเปิดหน้ารายละเอียดทำให้แอปปิดตัวทันที เมื่อสินค้านั้นอยู่ลำดับที่ 2 หรือลำดับที่ 7 ขึ้นไปของรายการ ลำดับที่ 1 และ 3–6 เปิดได้ปกติ

## เงื่อนไขก่อนทดสอบ

1. ติดตั้งแอปบน emulator หรืออุปกรณ์จริง
2. เปิดแอปใหม่ (รายการเรียงตามชื่อ A→Z ซึ่งเป็นค่าเริ่มต้น)

## ขั้นตอนการทำซ้ำ

1. ที่หน้า Products แตะรูปสินค้าลำดับที่ 2 ("Sauce Labs Backpack (green)")
2. เปิดแอปใหม่ แล้วเลื่อนลงไปแตะรูปสินค้าลำดับที่ 7 ขึ้นไป เช่น "Sauce Labs Bolt T-Shirt"

## ผลที่คาดหวัง

แอปเปิดหน้ารายละเอียดของสินค้าที่แตะ ไม่ว่าสินค้าจะอยู่ลำดับใด

## ผลที่เกิดขึ้นจริง

แอปปิดตัวและกลับไปหน้า Home ของ Android

## หลักฐาน

Crash log จาก `adb logcat -b crash`:

```text
E/AndroidRuntime: FATAL EXCEPTION: main
E/AndroidRuntime: Process: com.saucelabs.mydemoapp.android
E/AndroidRuntime: java.lang.ArrayIndexOutOfBoundsException: length=6; index=7
E/AndroidRuntime:     at ...view.fragments.ProductCatalogFragment.lambda$setAdapter$0(ProductCatalogFragment.java:156)
E/AndroidRuntime:     at ...view.adapters.ProductsAdapter$1.onClick(ProductsAdapter.java:57)
```

จาก source code ของแอป (`ProductCatalogFragment.setAdapter`): แอปอ่านค่าจาก array `meta` ขนาด 6 ช่อง ตามลำดับของสินค้าที่แตะ ช่องที่ 2 เป็น `null` (มี comment ว่าเป็นบั๊กที่ใส่ไว้สำหรับเดโม) ส่วนลำดับที่ 7 ขึ้นไปจะอ่านเกินขนาด array

## ผลกระทบและความเสี่ยง

- ผู้ใช้เปิดสินค้าได้เพียง 5 จาก 24 รายการเมื่อเรียงตามชื่อ
- ปัญหาบังบั๊กอื่นที่อยู่ในหน้ารายละเอียดสินค้า เช่น [BUG-004](BUG-004-bolt-tshirt-adds-ten-units.md) ซึ่งต้องเปลี่ยนการเรียงลำดับก่อนจึงจะทดสอบได้

## หมายเหตุสำหรับ Automation

- ชุดทดสอบเปิดเฉพาะสินค้าลำดับที่ 1 (Backpack ใน TC-MOB-005)
- TC-MOB-006 เรียงตามราคาก่อนเพื่อให้ Bolt T-Shirt อยู่ลำดับที่ 3
- ถ้าจะเพิ่มเคสทดสอบ BUG-005 โดยตรง ให้ตรวจว่าแอปยังอยู่หน้าเดิมหลังแตะสินค้าลำดับที่ 7 และเก็บ crash log เป็นหลักฐาน
