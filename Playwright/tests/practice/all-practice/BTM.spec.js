// Button State Machine (BTM) Test Suite

// ตรวจ enable/disable state ตาม from completion

import { test, expect } from '@playwright/test';        

test('Pay button เปิด-ปิด ตาม form', async ({ page }) => {
  const payBtn = page.getByRole('button', { name: 'Pay Now' });

  // เริ่มต้น disabled
  await expect(payBtn).toBeDisabled();

  // กรอก card number
  await page.getByLabel('Card number').fill('4111111111111111');
  await expect(payBtn).toBeDisabled(); // ยัง disabled — กรอกไม่ครบ

  // กรอกครบ
  await page.getByLabel('Expiry').fill('12/27');
  await page.getByLabel('CVC').fill('123');
  await expect(payBtn).toBeEnabled(); // ✅ enabled แล้ว

  // ลบ field หนึ่ง → disabled อีกครั้ง
  await page.getByLabel('CVC').clear();
  await expect(payBtn).toBeDisabled();
  
});
