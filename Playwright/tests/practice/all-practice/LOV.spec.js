// List Ordering Verification

// ตรวจว่า Sort ทำงานถูกต้อง

import { test, expect } from "@playwright/test";

    test('Sort by price low to high', async ({ page }) => {
        await page.getByLabel('Sort by').selectOption('price-asc');

        //ดึงราคาทั้งหมด
        const priceTexts = await page.locator('.product-price').allTextContents();

        // แปลงเป็นตัวเลข
        const prices = priceTexts.map(text => parseFloat(text.replace('$', '')));

        // ตรวจว่าเรียงจากน้อยไปมาก
        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
        }

        //หรือเปรียบเทียบกับ sorted copy
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    
    
    });