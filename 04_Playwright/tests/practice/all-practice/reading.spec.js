//Task: กรอก Registration form: ชื่อ, อีเมล, รหัสผ่าน (verify), 
// country dropdown, newsletter checkbox, submit และตรวจ success

import { test, expect } from '@playwright/test';

test('กรอก Registration form ครบ', async ({page}) => {
    await page.goto('/register');

    await page.getByLabel('Full Name').fill('Yatichapat Kanta');
    await page.getByLabel('Email').fill('newtytwenty6510@gmail.com');
    await page.getByLabel('Password').fill('Abcd@1234');
    await page.getByLabel('Confirm Password').fill('Abcd@1234');
    await page.getByLabel('Country').selectOption('Thailand');
    await page.getByLabel('Subscribe to newsletter').check();

    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page.getByText('Account created successfully')).toBeVisible();

});


//เลือก skills หลายอย่าง และตรวจ selected value
test('เลือก skills หลายค่า และตรวจ selected value', async ({ page }) => {
  await page.goto('/settings');

  //เลือกหลายค่าใน Multi-select dropdown
  await page.getByLabel('Skills').selectOption([
    'JavaScript', 'Python', 'TypeScript'
  ]);

  //ตรวจ selected value ของ Multi-select dropdown
  const selectedValues = await page.getByLabel('Skills').evaluate((el) => {
    return Array.from(el.selectedOptions).map((option) => option.value);
  });
  expect(selectedValues).toEqual(['JavaScript', 'Python', 'TypeScript']);

  //เลือกโดย index ของ option ใน Multi-select dropdown
  await page.getByLabel('Proficiency').selectOption({ index: 0 }); //เลือก option ที่ ตัวแรก
});


//Hover Menu + Sub-menu : Hover เปิดเมนู แล้วคลิก sub-menu item

test('Hover เมนูและ tooltip ทำงาน', async ({ page }) => {
  await page.goto('/');

  //Hover เปิด dropdown menu
  await page.getByRole('button', { name: 'Account' }).hover();

  //รอ sub-menu ปรากฏ
  await expect(page.getByRole('menu')).toBeVisible();

  //คลิก sub-menu item
  await page.getByRole('menuitem', { name: 'My Profile' }).click();
  await expect(page).toHaveURL('/profile');

  //Hover แล้วตรวจ tooltip : Hover แล้วตรวจ tooltip text
  await page.getByRole('img', { name: 'Help' }).hover();
  await expect(page.getByRole('tooltip')).toContainText('Click for help');
});


//Keyboard Navigation : ใช้ keyboard navigation ใน form

test('keyboard navigation ทำงานถูกต้อง', async ({ page }) => {
  await page.goto('/login');

  // Tab จาก username ไป password
  await page.getByLabel('Username').fill('admin');
  await page.keyboard.press('Tab');
  await expect(page.getByLabel('Password')).toBeFocused();

  // Tab ไป Submit แล้ว Enter
  await page.getByLabel('Password').fill('pass');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/dashboard/);

  // Escape ปิด modal
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
});


//File Upload + Validation : อัปโหลดไฟล์ และตรวจ validation

test('upload file และตรวจ preview', async ({ page }) => {
  await page.goto('/profile');

  // Single file upload
  await page.getByLabel('Profile Photo')
    .setInputFiles('./test-data/avatar.jpg');

  // ตรวจชื่อไฟล์ปรากฏ
  await expect(page.getByText('avatar.jpg')).toBeVisible();

  // Multiple files
  await page.getByLabel('Documents').setInputFiles([
    './test-data/doc1.pdf',
    './test-data/doc2.pdf'
  ]);

  // Clear uploaded files
  await page.getByLabel('Documents').setInputFiles([]);

  // ตรวจ error เมื่ออัปโหลดไฟล์ผิดประเภท
  await page.getByLabel('Profile Photo')
    .setInputFiles('./test-data/document.pdf');
  await expect(page.getByText('Please upload an image file')).toBeVisible();
});


//Drag and Drop (Kanban Board) : Drag and drop card จาก column หนึ่งไปอีก column หนึ่ง

test('ย้าย task จาก Todo → In Progress', async ({ page }) => {
  await page.goto('/kanban');

  // หา card ที่ต้องการย้าย
  const taskCard = page.locator('.task-card')
    .filter({ hasText: 'Fix login bug' });

  // Drag ไปที่ column In Progress
  const inProgressCol = page.getByText('In Progress')
    .locator('xpath=ancestor::div[@class="column"]');

  await taskCard.dragTo(inProgressCol);

  // ตรวจว่า card อยู่ใน column ใหม่
  await expect(inProgressCol.getByText('Fix login bug')).toBeVisible();

  // ตรวจว่า column เดิมไม่มี card แล้ว
  const todoCol = page.getByText('Todo')
    .locator('xpath=ancestor::div[@class="column"]');
  await expect(todoCol.getByText('Fix login bug')).not.toBeVisible();
});


//Rich Text Editor : ใส่ข้อความใน rich text editor และตรวจผลลัพธ์

test('พิมพ์และ format ข้อความ', async ({ page }) => {
  const editor = page.locator('[contenteditable="true"]');

  // คลิก focus ก่อน
  await editor.click();

  // พิมพ์ข้อความ
  await editor.type('Hello Playwright!', { delay: 50 });

  // Select All แล้ว Bold
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Control+B');

  // ตรวจว่า text มี bold formatting
  await expect(editor.locator('strong'))
    .toContainText('Hello Playwright!');

  // Clear ทั้งหมด
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Delete');
});