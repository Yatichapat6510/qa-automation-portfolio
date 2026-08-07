// ทดสอบ Form Validation ทุก field — ทั้ง error cases และ success flow
// เพิ่ม comment เพื่ออธิบายว่าแต่ละบรรทัดทำอะไร

import { expect, test } from '../interaction-workflows/fixtures/demo-app.fixture.js';

test.describe('Registration Form Validation', () => {

  // ก่อนทุก test ให้ไปหน้า register ใหม่เสมอ
  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  test('แสดง error ทุก field เมื่อ submit ว่างเปล่า', async ({ page }) => {
    // คลิกปุ่มลงทะเบียนโดยไม่กรอกข้อมูล
    await page.getByRole('button', { name: 'Create Account' }).click();
    // ตรวจสอบว่า error message ปรากฏครบทั้งชื่อ อีเมล รหัสผ่าน และ confirm password
    await expect.soft(page.getByText('Full Name is required', { exact: true })).toBeVisible();
    await expect.soft(page.getByText('Email is required', { exact: true })).toBeVisible();
    await expect.soft(page.getByText('Password is required', { exact: true })).toBeVisible();
    await expect.soft(page.getByText('Confirm Password is required', { exact: true })).toBeVisible();
    // ตรวจสอบจำนวน field error ว่าตรงกับที่คาดไว้ 4 ข้อความ
    await expect(page.locator('.field-error')).toHaveCount(4);
  });

  test('email format ต้องถูกต้อง', async ({ page }) => {
    // กรอกอีเมลไม่ถูกต้องและเบลอร์เพื่อให้ validation ทำงาน
    await page.getByLabel('Email').fill('not-an-email');
    await page.getByLabel('Email').blur();
    await expect(page.getByText('Invalid email format')).toBeVisible();

    // แก้เป็นอีเมลถูกต้องและตรวจสอบว่า error หายไป
    await page.getByLabel('Email').fill('valid@email.com');
    await page.getByLabel('Email').blur();
    await expect(page.getByText('Invalid email format')).not.toBeVisible();
  });

  test('password ต้องยาวอย่างน้อย 8 ตัวอักษร', async ({ page }) => {
    // กรอกรหัสผ่านสั้นกว่า 8 ตัวเพื่อทดสอบ validation
    await page.getByLabel('Password', { exact: true }).fill('short');
    await page.getByLabel('Password', { exact: true }).blur();
    // ตรวจสอบว่าแสดงข้อความเตือนความยาวรหัสผ่าน
    await expect(page.getByText('Password must be at least 8 characters')).toBeVisible();
  });

  test('ลงทะเบียนสำเร็จเมื่อข้อมูลครบถ้วน', async ({ page }) => {
    // กรอกข้อมูลครบถ้วนสำหรับการลงทะเบียนสำเร็จ
    await page.getByLabel('Full Name').fill('Somchai Jaidee');
    await page.getByLabel('Email').fill('somchai@test.com');
    await page.getByLabel('Password', { exact: true }).fill('Secure@2025');
    await page.getByLabel('Confirm Password').fill('Secure@2025');
    await page.getByRole('button', { name: 'Create Account' }).click();
    // ตรวจสอบว่าสำเร็จและมีข้อความยืนยันการสร้างบัญชี
    await expect(page.getByText('Account created successfully')).toBeVisible();
  });
});