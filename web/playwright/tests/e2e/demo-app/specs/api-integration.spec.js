// Test UI ที่ fetch data จาก API — mock response แล้วตรวจว่า UI render ถูกต้อง

import { test, expect } from '../fixtures/demo-app.fixture.js';

test.describe('API Integration Tests', () => {

  test('แสดง user list จาก mock API', async ({ page }) => {
    // Mock ก่อน goto: ใช้ page.route เพื่อจับ request ที่ไปยัง /api/users
    // ทำไม: เพื่อให้เทสไม่ต้องพึ่ง API จริง และควบคุมผลลัพธ์ให้สม่ำเสมอ
    await page.route('**/api/users', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: 1, name: 'Alice', role: 'Admin' },
          { id: 2, name: 'Bob',   role: 'User'  },
        ])
      })
    );

    // ใช้ page.goto('/users') เพื่อเปิดหน้าที่ต้องการทดสอบ
    await page.goto('/users');

    // page.getByRole('row') คือการเลือกองค์ประกอบตาม role=row
    // ทำไม: เพื่อเช็คว่ามีแถวในตารางครบตามจำนวนที่คาดหวัง (header + 2 rows)
    await expect(page.getByRole('row')).toHaveCount(3); // header + 2 rows

    // page.getByText('Alice') คือการเลือกข้อความ 'Alice' ที่ปรากฏบนหน้า
    // ทำไม: เพื่อยืนยันว่า UI แสดงชื่อผู้ใช้ที่ได้รับจาก API อย่างถูกต้อง
    await expect(page.getByText('Alice')).toBeVisible();
  });

  
  test('แสดง error state เมื่อ API ล่ม', async ({ page }) => {
    // mock response ด้วย status 500 เพื่อจำลองว่า API ล่ม
    // ทำไม: เพราะเราต้องทดสอบโซนที่แอปต้องแสดง error state แทนข้อมูลปกติ
    await page.route('**/api/users', route =>
      route.fulfill({ status: 500 })
    );

    // เปิดหน้า /users เพื่อให้ UI ทำงานและแสดง error state
    await page.goto('/users');

    // getByText('Something went wrong') ใช้ค้นหาข้อความที่แสดงสถานะ error
    // ทำไม: เพื่อยืนยันว่า UI แสดงข้อความผิดพลาดให้ผู้ใช้เห็น
    await expect(page.getByText('Something went wrong')).toBeVisible();

    // getByRole('button', { name: 'Retry' }) ใช้เลือกปุ่ม Retry ตามชื่อ
    // ทำไม: เพื่อยืนยันว่า UI มีปุ่มสำหรับให้ผู้ใช้ลองใหม่เมื่อ API ล้ม
    await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible();
  });

  
  test('ส่ง POST request เมื่อ create user', async ({ page }) => {
    // เปิดหน้า /users ก่อนจะทำการสร้างผู้ใช้
    await page.goto('/users');

    // Promise.all ใช้รอทั้งการเกิด request และการกดปุ่มพร้อมกัน
    // ทำไม: เพื่อให้เราสามารถจับ request ที่ถูกส่งจากปุ่มกดได้ทันที
    const [request] = await Promise.all([
      // waitForRequest จะรอ request ที่มี URL ต่อด้วย /api/users และ method เป็น POST
      page.waitForRequest(r =>
        r.url().includes('/api/users') && r.method() === 'POST'
      ),
      // getByRole('button', { name: 'Create User' }) เลือกปุ่มตามชื่อ
      // ทำไม: เพื่อกดปุ่มสร้างผู้ใช้และกระตุ้นการส่ง request
      page.getByRole('button', { name: 'Create User' }).click()
    ]);

    // postDataJSON() ใช้ดึงข้อมูล payload จาก request ที่ถูกส่ง
    // ทำไม: เพื่อเช็คว่าข้อมูลที่ส่งไปยัง API ถูกต้องตามที่คาดหวัง
    const body = request.postDataJSON();

    // ตรวจว่าข้อมูลใน body มีชื่อและบทบาทถูกส่งมา
    expect(body.name).toBeDefined();
    expect(body.role).toBe('user');
  });
});
