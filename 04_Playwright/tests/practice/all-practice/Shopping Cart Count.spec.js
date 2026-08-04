// ตรวจ Count เปลี่ยนตามการเพิ่ม/ลบสินค้า

import { test, expect } from '@playwright/test';

    test('ตรวจ Count เปลี่ยนตามการเพิ่ม/ลบสินค้า', async ({ page }) => {
    
        // ตรวจ cart badge เริ่มต้นว่างเปล่า
        await expect(page.locator('.cart-badge')).not.toBeVisible();
        
        // เพิ่มสินค้า 1 ชิ้น
        await page.getByRole('button', { name: 'Add to Cart' }).first().click();
        await expect(page.locator('.cart-badge')).toHaveText('1');

        // เพิ่มสินค้าอีก 1 ชิ้น
        await page.getByRole('button', { name: 'Add to Cart'}).nth(1).click();
        await expect(page.locator('.cart-badge')).toHaveText('2');

        // ลบสินค้า 1 ชิ้น
        await page.getByRole('button', { name: 'Remove from Cart' }).all().first().click();
        await expect(page.locator('.cart-badge')).not.toBeVisible();

        // ตรวจสอบจำนวน item ใน cart page
        await page.locator('.cart-icon').click();
        await expect(page.locator('.cart-item')).toHaveCount(1);

});