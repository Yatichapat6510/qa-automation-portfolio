// POM Login Page

import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }
    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    async loginAsStandardUser() {
        await this.login('standard_user', 'secret_sauce');
    }
    async expectErrorMessage(message) {
        await expect(this.errorMessage).toContainText(message);
    }
    async expectLoginSuccess() {
        await expect(this.page).toHaveURL('inventory');
    }
}