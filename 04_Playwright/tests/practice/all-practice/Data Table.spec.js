// คลิก Edit ของ Alice เท่านั้น

await page.getByRole('row')
  .filter({ hasText: 'Alice Smith' })
  .getByRole('button', { name: 'Edit' })
  .click();


// ตรวจ status column ทั้งหมด

const statuses = await page
  .getByRole('row')
  .filter({ hasNot: page.getByRole('columnheader') })
  .locator('td:nth-child(2)')
  .allTextContents();


// ['Active', 'Inactive']
// นับ rows ที่ Active

const activeRows = page.getByRole('row')
  .filter({ hasText: 'Active' });
await expect(activeRows).toHaveCount(1);