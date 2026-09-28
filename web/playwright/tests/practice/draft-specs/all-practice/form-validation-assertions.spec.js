//Scenario: คลิก Submit โดยไม่กรอก field ใดเลย - ควรเห็น error messages ทุก field และ URL ไม่เปลี่ยน

import { test, expect } from '@playwright/test';

test('validation messages ปรากฏเมื่อ Submit โดยไม่กรอก field', async ({ page }) => {
    await page.getByRole('button', { name: 'Submit' }).click();

    // Soft assertion - ดู failed assertion ทั้งหมดครั้งเดียว
    await expect.soft(page.getByText('Name is required')).toBeVisible();
    await expect.soft(page.getByText('Email is required')).toBeVisible();
    await expect.soft(page.getByText('Password is required')).toBeVisible();
    
    // URL ไม่เปลี่ยน
    await expect(page).not.toHaveURL(/success/);

    // Submit button ยังคง enabled
    await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();

    // Error Container มีกี่ Error
    await expect(page.locator('.error-message')).toHaveCount(3);


});