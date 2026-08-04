// active link ด้วย class
page.locator('.nav-link.active')         // CSS compound selector

// link ทั้งหมดใน nav
page.getByRole('navigation').getByRole('link')

// เปิด dropdown แล้วคลิก menuitem
await page.getByRole('button', { name: 'More' }).click();
await page.getByRole('menuitem', { name: 'About' }).click();

// ตรวจว่า dropdown ปิด/เปิด
await expect(
  page.getByRole('button', { name: 'More' })
).toHaveAttribute('aria-expanded', 'true');