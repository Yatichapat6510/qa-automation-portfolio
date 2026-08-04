# QA Workshop Demo API

แอปสาธิตสำหรับฝึก Automation Testing ทุก Tools

## วิธีรัน

```bash
pip install -r requirements.txt
python app.py
```

API จะรันที่ `http://localhost:5000`

## Endpoints

| Method | Endpoint              | Auth | คำอธิบาย              |
|--------|-----------------------|------|----------------------|
| GET    | /health               | No   | Health check         |
| POST   | /api/login            | No   | รับ token            |
| POST   | /api/logout           | Yes  | Logout               |
| GET    | /api/users            | Yes  | ดูรายการ users       |
| GET    | /api/users/:id        | Yes  | ดู user เดียว        |
| POST   | /api/users            | Yes  | สร้าง user ใหม่      |
| PUT    | /api/users/:id        | Yes  | แก้ไข user           |
| DELETE | /api/users/:id        | Yes  | ลบ user              |
| GET    | /api/products         | No   | ดูรายการ products    |
| GET    | /api/products/:id     | No   | ดู product เดียว     |
| POST   | /api/products         | Yes  | สร้าง product ใหม่   |
| POST   | /api/orders           | Yes  | สร้าง order          |
| GET    | /api/orders/:id       | Yes  | ดู order             |
| GET    | /api/search?q=        | No   | ค้นหา products       |

## Auth

ใช้ `Authorization: Bearer test-token-123` ใน header

### Login
```json
POST /api/login
{
  "username": "admin",
  "password": "password123"
}
```
