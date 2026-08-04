# Week 5 — JMeter Performance Testing

## ติดตั้ง JMeter

1. ดาวน์โหลด: https://jmeter.apache.org/download_jmeter.cgi
2. แตกไฟล์ → เปิด `bin/jmeter.bat` (Windows)

## Test Plans ที่ต้องสร้าง

### Plan 1: Load Test (โหลดปกติ)
```
Thread Group:
  - Number of Threads: 50
  - Ramp-up Period: 10 seconds
  - Loop Count: 5
  
HTTP Request: GET /api/products

Assertions:
  - Response Code: 200
  - Response Time < 500ms

Listeners:
  - Aggregate Report
  - Summary Report
```

### Plan 2: Stress Test (หาจุดแตกหัก)
```
Thread Group:
  - เพิ่ม users ทีละ 10: 10 → 20 → 50 → 100 → 200
  - ดูที่จุดไหน Error Rate > 5%
```

### Plan 3: Spike Test (surge กะทันหัน)
```
เริ่มที่ 5 users → spike เป็น 100 → กลับ 5
ดูว่า app recover ได้ไหม
```

### Plan 4: Soak Test (ทดสอบระยะยาว)
```
Thread Group:
  - 10 users
  - Duration: 10 นาที
  - ดู Memory Leak / Performance Degradation
```

---

## วิธีรัน JMeter แบบ CLI

```bash
# รัน test plan
jmeter -n -t load_test.jmx -l results.jtl

# สร้าง HTML Dashboard
jmeter -g results.jtl -o dashboard/

# เปิด dashboard
# เปิด dashboard/index.html ในบราวเซอร์
```

---

## Metrics ที่ต้องดู

| Metric            | ความหมาย                    | เป้าหมาย     |
|-------------------|-----------------------------|-------------|
| Average           | เวลาตอบสนองเฉลี่ย           | < 500ms     |
| 90th Percentile   | 90% ของ request ใช้เวลาไม่เกิน | < 1000ms |
| 99th Percentile   | 99% ของ request ใช้เวลาไม่เกิน | < 2000ms |
| Throughput (TPS)  | Transactions per second     | ยิ่งสูงยิ่งดี |
| Error Rate        | % ของ request ที่ fail      | < 1%        |

---

## Exercise: สร้าง JMeter Test Plan

### Step 1: Load Test `/api/products`
1. เปิด JMeter
2. Add > Thread Group → 50 threads, ramp 10s, loop 5
3. Add > Sampler > HTTP Request
   - Server: localhost
   - Port: 5000
   - Path: /api/products
4. Add > Assertion > Response Assertion
   - Response Code: 200
5. Add > Listener > Aggregate Report
6. Run → บันทึกผล

### Step 2: Load Test `/api/login` (POST)
1. เพิ่ม HTTP Request ใหม่
   - Method: POST
   - Path: /api/login
   - Body: `{"username":"admin","password":"password123"}`
   - Add Header: Content-Type: application/json
2. Add > Extractor > JSON Extractor
   - Variable: token
   - Expression: $.token
3. ใช้ `${token}` ใน request ถัดไป

### Step 3: วิเคราะห์ผล
หลังรัน ให้บันทึก:
- Average Response Time
- 90th Percentile
- Throughput (TPS)
- Error Rate
- สรุป: app รองรับ concurrent users ได้เท่าไหร่?
