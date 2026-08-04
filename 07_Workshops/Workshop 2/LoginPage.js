/**
 * 📦 Page Object: LoginPage
 * =====================================================
 * เก็บ Locators และ Actions ของหน้า Login ไว้ที่เดียว
 * ถ้า UI เปลี่ยน แก้ที่ไฟล์นี้ที่เดียวพอ
 */

class LoginPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.url  = 'https://www.saucedemo.com';

    // ── Locators ──────────────────────────────────────
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton   = page.locator('#login-button');
    this.errorMessage  = page.locator('[data-test="error"]');
  }

  /** เปิดหน้า Login */
  async goto() {
    await this.page.goto(this.url);
  }

  /**
   * กรอก credentials แล้วกด Login
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** อ่านข้อความ Error Message */
  async getError() {
    return (await this.errorMessage.textContent()) ?? '';
  }
}

module.exports = { LoginPage };
