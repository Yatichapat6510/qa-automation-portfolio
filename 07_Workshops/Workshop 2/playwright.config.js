// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  // ── ที่อยู่ของ Test Files ──────────────────────────
  testDir: './tests',

  // ── รัน Tests แบบขนาน (parallel) ─────────────────
  fullyParallel: true,

  // ── CI: ห้ามใช้ test.only (ป้องกัน run แค่บางตัว) ──
  forbidOnly: !!process.env.CI,

  // ── จำนวนครั้ง Retry เมื่อ Test ล้มเหลว ─────────
  retries: process.env.CI ? 2 : 0,

  // ── จำนวน Workers (กระบวนการขนาน) ───────────────
  workers: process.env.CI ? 1 : undefined,

  // ── Report ────────────────────────────────────────
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],  // HTML Report
    ['list'],                                           // Console Output
  ],

  // ── Default Settings สำหรับทุก Test ──────────────
  use: {
    baseURL:    'https://www.saucedemo.com',
    trace:      'on-first-retry',    // บันทึก Trace เมื่อ Retry
    screenshot: 'only-on-failure',   // ถ่ายภาพเมื่อ Fail
    video:      'retain-on-failure', // บันทึก Video เมื่อ Fail
  },

  // ── Browsers ที่ต้องการทดสอบ ──────────────────────
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    // เปิด comment เพื่อทดสอบ Firefox และ Mobile
    // { name: 'firefox', use: { browserName: 'firefox' } },
    // { name: 'Mobile Chrome', use: { ...require('@playwright/test').devices['Pixel 5'] } },
  ],
};

module.exports = config;
