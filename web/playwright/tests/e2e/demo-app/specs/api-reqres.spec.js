import { test, expect } from '../fixtures/demo-app.fixture.js';

const API_PATH = '/api/reqres';
const users = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  email: `user${index + 1}@reqres.in`,
}));

async function callApi(page, path, method = 'GET', data) {
  return page.evaluate(async ({ path, method, data }) => {
    const response = await fetch(path, {
      method,
      headers: data ? { 'content-type': 'application/json' } : undefined,
      body: data ? JSON.stringify(data) : undefined,
    });
    const text = await response.text();
    return { status: response.status, body: text ? JSON.parse(text) : undefined };
  }, { path: `${API_PATH}${path}`, method, data });
}

test.describe('Reqres API — Users CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(`**${API_PATH}/**`, route => {
      const request = route.request();
      const { pathname, searchParams } = new URL(request.url());
      const path = pathname.slice(API_PATH.length);
      const data = request.postDataJSON();
      let status = 200;
      let body;

      if (request.method() === 'GET' && path === '/users' && searchParams.get('page') === '1') {
        body = { data: users };
      } else if (request.method() === 'GET' && path === '/users/2') {
        body = { data: users[1] };
      } else if (request.method() === 'GET' && path === '/users/9999') {
        status = 404;
      } else if (request.method() === 'POST' && path === '/users') {
        status = 201;
        body = { ...data, id: '100', createdAt: '2026-08-06T00:00:00.000Z' };
      } else if (request.method() === 'PUT' && path === '/users/2') {
        body = { ...data, updatedAt: '2026-08-06T00:00:00.000Z' };
      } else if (request.method() === 'PATCH' && path === '/users/2') {
        body = { ...data, updatedAt: '2026-08-06T00:00:00.000Z' };
      } else if (request.method() === 'DELETE' && path === '/users/2') {
        status = 204;
      } else if (request.method() === 'POST' && path === '/login') {
        body = { token: 'deterministic-token' };
      } else {
        status = 404;
      }

      return route.fulfill({ status, contentType: 'application/json', body: body ? JSON.stringify(body) : '' });
    });
    await page.goto('http://demo.local/');
  });

  test('GET users — รายการ users', async ({ page }) => {
    const response = await callApi(page, '/users?page=1');
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(6);
    expect(response.body.data[0]).toHaveProperty('email');
  });

  test('GET user by id — user คนเดียว', async ({ page }) => {
    const response = await callApi(page, '/users/2');
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(2);
    expect(response.body.data.email).toContain('@reqres.in');
  });

  test('GET user 404 — user ไม่มีอยู่', async ({ page }) => {
    const response = await callApi(page, '/users/9999');
    expect(response.status).toBe(404);
  });

  test('POST create user — สร้าง user ใหม่', async ({ page }) => {
    const response = await callApi(page, '/users', 'POST', { name: 'Somchai', job: 'QA Engineer' });
    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe('Somchai');
    expect(response.body.createdAt).toBeDefined();
  });

  test('PUT update user — อัปเดตข้อมูล', async ({ page }) => {
    const response = await callApi(page, '/users/2', 'PUT', { name: 'Somchai Updated', job: 'Senior QA' });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Somchai Updated');
    expect(response.body.updatedAt).toBeDefined();
  });

  test('PATCH partial update', async ({ page }) => {
    const response = await callApi(page, '/users/2', 'PATCH', { job: 'Lead QA' });
    expect(response.status).toBe(200);
    expect(response.body.job).toBe('Lead QA');
  });

  test('DELETE user — ลบ user', async ({ page }) => {
    const response = await callApi(page, '/users/2', 'DELETE');
    expect(response.status).toBe(204);
  });

  test('POST login — authenticate user', async ({ page }) => {
    const response = await callApi(page, '/login', 'POST', { email: 'eve.holt@reqres.in', password: 'cityslicka' });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
