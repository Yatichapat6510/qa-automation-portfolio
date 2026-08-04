// ======================================
// Set 5: API Mocking
// ======================================

import { test, expect } from '@playwright/test';


//5.1 Refactor to POM
//====================

test('แสดง error เมื่อ API ล่ม', async ({ page }) => {
  await page.route('**/api/stats', route =>
    route.fulfill({ status: 500 })
  );
  await page.goto('/dashboard');
  await expect(page.getByText('Unable to load')).toBeVisible();
});


//5.2 Verify Request + Pure API
//=============================

// 5.2 Verify search request
test('api mocking - verify search request contains query param', async ({ page }) => {
  const [req] = await Promise.all([
    page.waitForRequest(r => r.url().includes('/api/search')),
    page.getByRole('searchbox').fill('iPhone').then(() =>
      page.keyboard.press('Enter')
    )
  ]);
  expect(req.url()).toContain('q=iPhone');
});

// 5.3 Pure API
test('GET /api/users/2', async ({ request }) => {
  const res = await request.get('https://reqres.in/api/users/2');
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.data.id).toBe(2);
});
