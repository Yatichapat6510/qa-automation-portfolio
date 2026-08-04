// // Understand test structure first

// import { test, expect } from '@playwright/test';
// // ↑ import test runner and expect assertion

// test('Test Login Normal Case', async ({ page }) => {
// //    ↑ Test case name
// //                              ↑ async because all actions need to wait for results
// //                                       ↑ page = browser tab that we work on
// // Perform actions here
//         await page.goto('https://www.saucedemo.com/'); // await every line!!

// // assert = confirm > results here
//         await expect(page).toHaveURL(/something/);
// });



//Test 1: Normal Case
import { test, expect } from '@playwright/test';

test.describe('Login Feature', () => {
   test('ควร Login ได้ด้วย credentials ที่ถูกต้อง', async ({ page }) => {

    //   STEP 1: ไปที่หน้า Login
    await page.goto('https://www.saucedemo.com');

    //   STEP 2: กรอก Username
    //   Playwright รอให้ field พร้อมก่อนอัติโนมัติ
    await page.locator('#user-name').fill('standard_user')

    //   STEP 3: กรอรก Password
    await page.locator('#password').fill('secret_sauce');

   //   STEP 4: คลิกปุ่ม Login
   await page.locator('#login-button').click();

    //   STEP 5: Assert - ตรวจสอบว่า Login สำเร็จ
    //   วิธีที่ 1: เช็ค URL เปลี่ยนไปที่ Inventory
    await expect(page).toHaveURL(/inventory/);

    //   วิธีที่ 2: เช็คว่า "Products" heading ปรากฏ
    await expect(page.locator('.title')).toHaveText('Products');
   });


   //Test 2: ABNormal Case
   // Login Error Scenario
   test('ควรแสดง Error เมื่อ Password ผิด', async ({ page }) => {
      // ไปหน้า Login
      await page.goto('https://www.saucedemo.com');

      // กรอก credentials ผิด
      await page.locator('#user-name').fill('standard_user');
      await page.locator('#password').fill('WRONG_PASSWORD'); // ผิดตั้งใจเพื่อดูการแสดง Error
      await page.locator('#login-button').click();

      // Assert 1: error message ต้อง visible
      await expect(page.locator('[data-test="error"]')).toBeVisible();

      // Assert 2: error message มีข้อความที่ถูกต้อง
      await expect(page.locator('[data-test="error"]')).toContainText(
         'Epic sadface: Username and password do not match any user in this service');

      // Assert 3: URL ไม่ควรเปลี่ยน (ยังอยู่หน้า login)
      await expect(page).not.toHaveURL(/inventory/);
   });

});
