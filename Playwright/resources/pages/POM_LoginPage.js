// POM Login Page

import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }
    async goto() {
        await this.page.goto('/');
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
        await expect(this.page).toHaveURL(/\/inventory\.html$/);
    }
}
