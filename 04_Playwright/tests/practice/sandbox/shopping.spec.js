//Test 3: Complete Workflow

import { test, expect } from '@playwright/test';

test.describe('Shopping Flow', () => {

    // beforeEach = ทำก่อนทุก test ใน describe นี้
    // ไม่ต้องเขียน goto/login ซ้ำทุก test
    test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory/); // ยืนยัน login ผ่านก่อน
  });

  test('เพิ่มสินค้าลงตะกร้าได้', async ({ page }) => {

    // ตรวจว่าหน้า Products โหลดแล้ว
    await expect(page.locator('.title')).toHaveText('Products');

     // ตรวจว่ามีสินค้าในหน้า
    const Products = page.locator('.inventory_item');
    await expect(Products).toHaveCount(6); // saucedemo มี 6 สินค้า

    // คลิก Add to Cart ของสินค้าแรก
    await page.locator('.btn_primary.btn_inventory').first().click();

    // ตรวจ cart badge — ควรเปลี่ยนเป็น "1"
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('สินค้า sort by price low-high ได้', async ({ page }) => {

    // เลือก sort option
    await page.locator('.product_sort_container').selectOption('lohi');

    // ดึงราคาสินค้าทั้งหมด แล้วตรวจว่าเรียงจากน้อยไปมาก
    const prices = await page.locator('.inventory_item_price').allTextContents();
    const nums = prices.map(p => parseFloat(p.replace('$','')));

    // ตรวจว่าแต่ละราคา ≤ ราคาถัดไป
    for (let i = 0; i < nums.length - 1; i++) {
      expect(nums[i]).toBeLessThanOrEqual(nums[i + 1]);
    }

  });

  });