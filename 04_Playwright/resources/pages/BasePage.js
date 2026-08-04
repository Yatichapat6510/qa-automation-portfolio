// BasePage + Shared Methods : Inheritance -- shared navigation, notification 


// pages/BasePage.js
import { expect } from '@playwright/test';

export class BasePage {
  constructor(page) {
    this.page         = page;
    this.loadingSpinner = page.locator('.loading-spinner');
    this.successToast   = page.locator('.toast-success');
    this.errorToast     = page.locator('.toast-error');
  }

  async waitForPageLoad() {
    await this.loadingSpinner.waitFor({ state: 'hidden' });
    await this.page.waitForLoadState('networkidle');
  }

  async expectSuccess(message) {
    await expect(this.successToast).toContainText(message);
  }

  async expectError(message) {
    await expect(this.errorToast).toContainText(message);
  }

  async navigateTo(path) {
    await this.page.goto(path);
    await this.waitForPageLoad();
  }
}

// pages/ProfilePage.js — extends BasePage
export class ProfilePage extends BasePage {
  constructor(page) {
    super(page);
    this.nameField  = page.getByLabel('Display Name');
    this.saveBtn    = page.getByRole('button', { name: 'Save Changes' });
  }

  async updateName(name) {
    await this.nameField.fill(name);
    await this.saveBtn.click();
    await this.expectSuccess('Profile updated'); // inherited!
  }
}