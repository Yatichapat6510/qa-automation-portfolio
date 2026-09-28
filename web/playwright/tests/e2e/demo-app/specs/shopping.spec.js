// User Story: ในฐานะลูกค้า ฉันต้องการเลือกสินค้า เพิ่มใส่ตะกร้า และ checkout ได้สำเร็จ


import { test, expect } from '../fixtures/demo-app.fixture.js';

// Helper: login ก่อนทุก test
// ฟังก์ชันนี้จะเปิดเว็บและล็อกอินด้วย standard_user
async function loginAsStan(page){
    await page.goto('https://www.saucedemo.com'); // ไปที่หน้า login
    await page.locator('#user-name').fill('standard_user'); // ใส่ชื่อผู้ใช้
    await page.locator('#password').fill('secret_sauce'); // ใส่รหัสผ่าน
    await page.locator('#login-button').click(); // คลิกปุ่มเข้าสู่ระบบ
    await expect(page).toHaveURL(/inventory/); // ตรวจสอบว่าเข้า inventory page ได้
}

test.describe('Shopping Flow — SauceDemo', () => {

    test.beforeEach(async ({ page }) => {
        await loginAsStan(page); // เรียก helper login ก่อนทุก test
    });

    // ตรวจสอบว่าหน้าสินค้ามีไอเท็ม 6 ชิ้น และชื่อหน้าคือ Products
    test('แสดงสินค้า 6 รายการ', async ({ page }) => {
        await expect(page.locator('.inventory_item')).toHaveCount(6);
        await expect(page.locator('.title')).toHaveText('Products');
    });

    // ทดสอบการเรียงลำดับราคาจากน้อยไปมาก
    test('sort สินค้าราคาน้อยไปมากได้', async ({ page }) => {
        await page.locator('.product_sort_container').selectOption('lohi'); // เลือก sort option ราคาน้อยไปมาก
        const prices = await page.locator('.inventory_item_price').allTextContents(); // อ่านราคาสินค้าทั้งหมด
        const nums = prices.map(p => parseFloat(p.replace('$', ''))); // แปลงข้อความราคาเป็นตัวเลข
        for (let i = 0; i < nums.length - 1; i++)
            expect(nums[i]).toBeLessThanOrEqual(nums[i + 1]); // ตรวจว่าราคาต่อไปไม่ต่ำกว่าก่อนหน้า
    });

    // ทดสอบเพิ่มสินค้าเข้าตะกร้า และตรวจ badge แสดงจำนวน 1
    test('เพิ่มสินค้าลงตะกร้าและตรวจ badge', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click(); // คลิกเพิ่มสินค้าลงตะกร้า
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1'); // ตรวจ badge ว่ามีเลข 1
    });

    // ทดสอบลบสินค้าออกจากตะกร้าแล้ว badge หายไป
    test('ลบสินค้าออกจากตะกร้าได้', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="remove-sauce-labs-backpack"]').click(); // คลิกปุ่มลบ
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible(); // badge ควรไม่แสดง
    });

    // ทดสอบ checkout flow ตั้งแต่เพิ่มในตะกร้า จนจบคำสั่งซื้อ
    test('checkout flow ครบทุก step', async ({ page }) => {
        // Add to cart
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('.shopping_cart_link').click(); // ไปที่หน้าตะกร้า
        await page.locator('[data-test="checkout"]').click(); // เริ่ม checkout
        // Fill info
        await page.locator('[data-test="firstName"]').fill('Somchai');
        await page.locator('[data-test="lastName"]').fill('Jaidee');
        await page.locator('[data-test="postalCode"]').fill('10110');
        await page.locator('[data-test="continue"]').click(); // กดต่อไป
        // Verify summary
        await expect(page.locator('.summary_info')).toBeVisible(); // ตรวจข้อมูลสรุปคำสั่งซื้อ
        // Finish
        await page.locator('[data-test="finish"]').click(); // สั่งซื้อเสร็จสิ้น
        await expect(page.locator('.complete-header'))
            .toHaveText('Thank you for your order!'); // ตรวจข้อความยืนยันการสั่งซื้อ
    });

    // ทดสอบกรณี locked_out_user ไม่สามารถล็อกอินได้
    test('locked_out_user ไม่สามารถ login ได้', async ({ page }) => {
        // Override: logout ก่อน แล้ว login ด้วย locked user
        await page.goto('https://www.saucedemo.com');
        await page.locator('#user-name').fill('locked_out_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
        await expect(page.locator('[data-test="error"]'))
            .toContainText('locked out'); // ตรวจข้อความ error ว่าถูกล็อกเอาท์
    });

});
