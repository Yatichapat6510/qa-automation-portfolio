# QA Review — API Testing Auth Collection

## สิ่งที่ปรับแล้ว

- เพิ่ม Pre-request และ Post-response test ให้ครบทั้ง 14 requests
- เพิ่ม status, SLA (ค่าเริ่มต้น 1,000 ms), JSON Content-Type, JSON Schema และ business assertions
- เปลี่ยน Public CRUD ให้ใช้ ID ที่ได้จาก POST แทน reserved ID 7 เพื่อให้ PUT/PATCH/DELETE ทดสอบ happy path ได้จริง
- แก้ Auth และ Authentication requests ที่เดิมบังคับ `status=404` ให้เป็น happy path; เก็บ negative testing ไว้เป็น scenario ที่ควรสร้างแยก เพื่อไม่ปนกับ regression run
- เพิ่ม dynamic data, ID chaining, token chaining และ cleanup สำหรับ DELETE
- ใช้ Postman `pm.response.to.have.jsonSchema` เพื่อ validate JSON Schema โดยไม่ต้องติดตั้ง library เพิ่ม

## ก่อนรัน

1. Import collection ฉบับ QA Reviewed ใน Postman
2. สร้าง Environment แล้วตั้ง `apiKey` เป็น API key ของคุณ (อย่าใส่ลง collection หรือ commit ลง Git)
3. ตั้ง Environment นั้นเป็น active environment
4. เรียง/รัน flow ดังนี้
   - Public CRUD: Get All → Create → Get Single → PUT → PATCH → DELETE
   - Authentication: Register → Login
   - Authenticated collection CRUD: Add → List → Get → PUT → PATCH → Delete

## ข้อค้นพบจากการ Review

| ระดับ | ประเด็น | ผลกระทบ |
|---|---|---|
| High | Auth และ Authentication requests มี `status=404` ใน URL ตายตัว | ทุก happy-path test จะล้ม แม้ระบบทำงานปกติ |
| High | Public update/delete ใช้ reserved ID 7 | API ตอบ 405 ตาม design จึงไม่ครอบคลุม CRUD success |
| High | ไม่มี `apiKey` ใน collection | Auth flow ทดสอบไม่ได้จนกว่าจะใส่ secret ผ่าน Environment |
| Medium | 8 จาก 14 requests ไม่มี scripts และสคริปต์เดิมหลายตัว assert error ที่เปราะบาง | coverage ไม่สม่ำเสมอและเกิด false failure ได้ |
| Medium | ไม่มี ID/token chaining | ทดสอบ workflow แบบ end-to-end และ cleanup ไม่ได้ |
| Low | Cache/Security headers ไม่ได้ระบุเป็น contract ของผู้ให้บริการ | สคริปต์ตรวจรูปแบบเมื่อ header มีมาให้ แต่ไม่ hard-fail เมื่อไม่มี |

## Negative test ที่แนะนำให้สร้างเป็น requests แยก

- GET object ที่ไม่มีอยู่จริง: ใช้ ID สุ่ม/ไม่มีอยู่ และ assert 404 + error schema
- Auth request ไม่มีหรือ API key ผิด: assert 401 + error schema
- Auth request ด้วย `?status=404`: assert 404 + error schema เพื่อทดสอบ error handler
- Login ด้วย password ผิด: assert 401 + error schema
- POST payload ที่ไม่มี `name` หรือส่ง JSON ไม่ถูกต้อง: assert 4xx ตาม contract จริง

> ผลลัพธ์ “pass” ของ Auth flow ขึ้นกับ API key ที่ถูกต้องและการรันจริง; collection นี้ยังไม่ได้รับรองผลจาก credential ของผู้ใช้.
