import { test, expect } from '@playwright/test';

test('สามารถ login ด้วย Credentials ที่ถูกต้อง', async ({ page }) => {
    //1. ไปหน้า Login 
    await page.goto('http://saucedemo.com');

    //2. กรอก credentials (Playwright รอให้ field พร้อมก่อน auto)
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');

    //3. คลิก login button
    await page.click('#login-button');

    //4. ตรวจว่า login สำเร็จ
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
});





// Playwright Test จัดการ Browser + Context ให้อัตโนมัติ
// เราแค่ใช้ { page } ที่ inject มาให้
test('auto managed', async ({ page }) => {
  await page.goto('/');   // ใช้ page ได้เลย
});

// ถ้าต้องการ multi-tab — ใช้ context
test('multi tab scenario', async ({ context }) => {
  const page1 = await context.newPage();
  const page2 = await context.newPage();
  await page1.goto('/cart');
  await page2.goto('/wishlist');
});

// Multi-user scenario — context แยกกัน = session แยกกัน
test('admin and user', async ({ browser }) => {
  // Create independent browser contexts so the example does not depend on
  // untracked admin.json/user.json files.
  const adminCtx = await browser.newContext();
  const userCtx = await browser.newContext();

  await adminCtx.close();
  await userCtx.close();
});





// ทดสอบ API โดยตรง — ไม่ต้องผ่าน browser
test('GET /posts returns 100 items', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts'
  );
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data).toHaveLength(100);
  expect(data[0]).toHaveProperty('title');
});

// UI + API ใน test เดียว — ทรงพลังมาก!
test('login แล้ว verify API response', async ({ page }) => {
  // Mock API
  await page.route('**/api/user', route =>
    route.fulfill({ json: { name: 'Test User', role: 'admin' } })
  );
  await page.goto('/dashboard');
  // UI แสดงข้อมูลจาก mocked API
  await expect(page.locator('.username')).toHaveText('Test User');
});





