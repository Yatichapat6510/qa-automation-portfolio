/**
 * 📦 Page Object: CheckoutPage
 */

class CheckoutPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;

    // ── Locators ──────────────────────────────────────
    this.firstNameInput  = page.locator('#first-name');
    this.lastNameInput   = page.locator('#last-name');
    this.zipInput        = page.locator('#postal-code');
    this.continueButton  = page.locator('#continue');
    this.finishButton    = page.locator('#finish');
    this.checkoutButton  = page.locator('#checkout');
    this.errorMessage    = page.locator('[data-test="error"]');
    this.completeHeader  = page.locator('.complete-header');
  }

  /**
   * กรอกข้อมูล Shipping แล้วกด Continue
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} zip
   */
  async fillInfo(firstName, lastName, zip) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipInput.fill(zip);
    await this.continueButton.click();
  }

  /** กด Finish เพื่อยืนยันคำสั่งซื้อ */
  async finish() {
    await this.finishButton.click();
  }
}

module.exports = { CheckoutPage };
