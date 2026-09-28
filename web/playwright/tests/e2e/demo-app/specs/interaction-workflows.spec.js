import { expect, test } from '../fixtures/demo-app.fixture.js';
import { avatarImage, documentPdf, supportingDocuments } from '../data/upload-files.data.js';

const DEMO_APP_ORIGIN = 'http://demo.local';

test.describe('Interaction workflows', () => {
  test('creates an account with registration details', async ({ page }) => {
    await page.goto('/register');

    await page.getByLabel('Full Name').fill('Yatichapat Kanta');
    await page.getByLabel('Email').fill('newtytwenty6510@gmail.com');
    await page.getByLabel('Password', { exact: true }).fill('Abcd@1234');
    await page.getByLabel('Confirm Password').fill('Abcd@1234');
    await page.getByLabel('Country').selectOption({ label: 'Thailand' });
    await page.getByLabel('Subscribe to newsletter').check();

    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page.getByText('Account created successfully')).toBeVisible();
  });

  test('selects multiple skills and a proficiency level', async ({ page }) => {
    await page.goto('/settings');

    const skills = page.getByLabel('Skills');
    await skills.selectOption(['JavaScript', 'Python', 'TypeScript']);
    await expect(skills).toHaveValues(['JavaScript', 'Python', 'TypeScript']);
    await page.getByLabel('Proficiency').selectOption({ index: 0 });
    await expect(page.getByLabel('Proficiency')).toHaveValue('Beginner');
  });

  test('opens an account menu and displays a help tooltip', async ({ page }) => {
    await page.goto(`${DEMO_APP_ORIGIN}/`);

    await page.getByRole('button', { name: 'Account' }).hover();
    await expect(page.getByRole('menu')).toBeVisible();
    await page.getByRole('menuitem', { name: 'My Profile' }).click();
    await expect(page).toHaveURL(`${DEMO_APP_ORIGIN}/profile`);

    await page.goto(`${DEMO_APP_ORIGIN}/`);
    await page.getByRole('img', { name: 'Help' }).hover();
    await expect(page.getByRole('tooltip')).toHaveText('Click for help');
  });

  test('supports keyboard navigation and closes the dashboard dialog', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Username').fill('admin');
    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Password')).toBeFocused();
    await page.getByLabel('Password').fill('pass');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL('/dashboard');

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('uploads an image and rejects a non-image profile photo', async ({ page }) => {
    await page.goto('/profile');

    await page.getByLabel('Profile Photo').setInputFiles(avatarImage);
    await expect(page.getByText('avatar.jpg')).toBeVisible();
    await page.getByLabel('Documents').setInputFiles(supportingDocuments);
    await page.getByLabel('Documents').setInputFiles([]);

    await page.getByLabel('Profile Photo').setInputFiles(documentPdf);
    await expect(page.getByText('Please upload an image file')).toBeVisible();
  });

  test('moves a Kanban task from Todo to In Progress', async ({ page }) => {
    await page.goto('/kanban');

    const taskCard = page.locator('.task-card', { hasText: 'Fix login bug' });
    const inProgressColumn = page.locator('.column', { has: page.getByRole('heading', { name: 'In Progress' }) });
    const todoColumn = page.locator('.column', { has: page.getByRole('heading', { name: 'Todo' }) });

    await taskCard.dragTo(inProgressColumn);
    await expect(inProgressColumn.getByText('Fix login bug')).toBeVisible();
    await expect(todoColumn.getByText('Fix login bug')).not.toBeVisible();
  });

  test('formats text in a rich text editor', async ({ page }) => {
    await page.goto('/editor');

    const editor = page.getByRole('textbox', { name: 'Rich text editor' });
    await editor.fill('Hello Playwright!');
    await editor.press('Control+A');
    await editor.press('Control+B');
    await expect(editor).toContainText('Hello Playwright!');
    await editor.press('Control+A');
    await editor.press('Delete');
    await expect(editor).toHaveText('');
  });
});
