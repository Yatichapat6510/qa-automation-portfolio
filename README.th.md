# QA Automation Portfolio (ภาษาไทย)

พอร์ตโฟลิโอด้าน QA และ Test Automation ครอบคลุม Web UI, API, Mobile, Performance, การตรวจสอบข้อมูลด้วย SQL และ CI/CD
แต่ละโปรเจกต์อธิบายเป้าหมายด้านคุณภาพ แนวทางการทดสอบ หลักฐาน และสิ่งที่จะพัฒนาต่อ ไม่ได้โชว์แค่เครื่องมือ

> English version: [README.md](README.md)

## ติดต่อ

- LinkedIn: [Yatichapat Kanta](https://www.linkedin.com/in/yatichapat-kanta-8a486b393/)
- อีเมล: [newtytwenty6510@gmail.com](mailto:newtytwenty6510@gmail.com)
- GitHub: [@Yatichapat6510](https://github.com/Yatichapat6510)

## เริ่มดูจากตรงไหน

1. [ดัชนีโปรเจกต์](projects/README.md) แสดงทุกโปรเจกต์พร้อมระดับความพร้อม
2. โปรเจกต์หลัก: [`web/playwright`](web/playwright/)
3. แนวคิดการเลือกเทสต์: [QA strategy](docs/qa-strategy.md)
4. ตัวอย่างการเขียนบั๊ก: [example bug reports](docs/examples/bug-reports/)

## โครงสร้างโฟลเดอร์

| โฟลเดอร์ | เนื้อหา |
| --- | --- |
| `web/` | Playwright (โปรเจกต์หลัก), Cypress, Robot Framework |
| `api/postman-newman/` | Postman collections รันด้วย Newman |
| `mobile/` | Appium และ Maestro |
| `learning/` | เวิร์กช็อปและแบบฝึกหัด (แยกจากงานโชว์อย่างชัดเจน) |
| `projects/` | หน้าอธิบายโปรเจกต์สำหรับผู้ตรวจพอร์ต |
| `docs/` | กลยุทธ์ QA, roadmap, template, ตัวอย่างบั๊ก |
| `.github/workflows/` | CI ทั้งหมดของ repository |

## หลักการ

- เลือกเทสต์ตามความเสี่ยง (P0/P1/P2)
- ไม่เก็บ secret ใน repository ใช้ GitHub Secrets หรือ environment variable
- ทุกโปรเจกต์รันได้จาก clean clone ด้วยคำสั่งใน README ของโปรเจกต์นั้น
