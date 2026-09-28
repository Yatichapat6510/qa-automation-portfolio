/**
 * Week 3 - Playwright UI Testing
 * ทดสอบ Login Flow ของ Web Application
 * รัน: npx playwright test
 */

const { test, expect } = require('@playwright/test');

// ========== CONFIG ==========
const BASE_URL = 'http://localhost:5000';
const API_TOKEN = 'test-token-123';

// ========== API TEST (Playwright สามารถทดสอบ API ได้ด้วย) ==========

test.describe('API Tests via Playwright', () => {

  test('TC-001: Health check returns ok', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/health`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.status).toBe('ok');
  });

  test('TC-002: Login with valid credentials', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/login`, {
      data: { username: 'admin', password: 'password123' }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.token).toBeTruthy();
  });

  test('TC-003: Login with wrong password → 401', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/login`, {
      data: { username: 'admin', password: 'wrongpass' }
    });
    expect(res.status()).toBe(401);
  });

  test('TC-004: Get products without auth', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/products`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.data).toBeInstanceOf(Array);
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('TC-005: Get users without auth → 401', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/users`);
    expect(res.status()).toBe(401);
  });

  test('TC-006: Get users with valid token', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/users`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.data).toBeInstanceOf(Array);
  });

  test('TC-007: Create user → 201', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/users`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      data: {
        name: 'Playwright User',
        email: `playwright_${Date.now()}@test.com`
      }
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.id).toBeTruthy();
    expect(body.name).toBe('Playwright User');
  });

  test('TC-008: Create user duplicate email → 409', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/users`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      data: { name: 'Duplicate', email: 'alice@example.com' }
    });
    expect(res.status()).toBe(409);
  });

  test('TC-009: Search products', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/search?q=laptop`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.count).toBeGreaterThan(0);
    expect(body.results[0].name.toLowerCase()).toContain('laptop');
  });

  test('TC-010: Create order success', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/orders`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      data: { product_id: '2', quantity: 1 }
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.status).toBe('confirmed');
    expect(body.total).toBeGreaterThan(0);
  });
});

// ========== CHAIN TESTS (Login → Use Token) ==========

test.describe('Chain Tests - Login then use token', () => {

  test('TC-020: Login then get users', async ({ request }) => {
    // Step 1: Login
    const loginRes = await request.post(`${BASE_URL}/api/login`, {
      data: { username: 'admin', password: 'password123' }
    });
    expect(loginRes.status()).toBe(200);
    const { token } = await loginRes.json();

    // Step 2: ใช้ token จาก Login
    const usersRes = await request.get(`${BASE_URL}/api/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    expect(usersRes.status()).toBe(200);
    const users = await usersRes.json();
    expect(users.total).toBeGreaterThan(0);
  });

  test('TC-021: Create user then verify by GET', async ({ request }) => {
    const email = `verify_${Date.now()}@test.com`;

    // Step 1: Create
    const createRes = await request.post(`${BASE_URL}/api/users`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      data: { name: 'Verify Me', email }
    });
    expect(createRes.status()).toBe(201);
    const created = await createRes.json();

    // Step 2: Get by ID
    const getRes = await request.get(`${BASE_URL}/api/users/${created.id}`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` }
    });
    expect(getRes.status()).toBe(200);
    const fetched = await getRes.json();
    expect(fetched.email).toBe(email);
  });
});
