// Scope ทุกอย่างอยู่ใน dialog
const dialog = page.getByRole('dialog');

// ตรวจ title
await expect(dialog.getByRole('heading'))
  .toHaveText('Confirm Delete');

// ตรวจชื่อใน paragraph
await expect(dialog).toContainText('Alice Smith');

// คลิก Delete ใน dialog เท่านั้น
await dialog.getByTestId('confirm-delete').click();
// หรือ
await dialog.getByRole('button', { name: 'Delete' }).click();

// Cancel scoped
await dialog.getByRole('button', { name: 'Cancel' }).click();

// ตรวจ dialog ปิดแล้ว
await expect(dialog).not.toBeVisible();