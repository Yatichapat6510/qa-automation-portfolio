// ======================================
// Set 4: POM (Page Object Model)
// ======================================

import { test, expect } from '@playwright/test';


//4.1 Refactor to POM
//====================

class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstnameField = page.getByLabel('First Name');
        this.lastNameField  = page.getByLabel('Last Name');
        this.continueBtn    = page.getByRole('button', { name: 'Continue' });
    }
    async fillShipping(first, Last) {
        await this.firstnameField.fill(first);
        await this.lastNameField.fill(Last);
        await this.continueBtn.click();
    }
}

//test

test('checkout', async ({ page }) => {
  const checkout = new CheckoutPage(page);
  await checkout.page.goto('/checkout');
  await checkout.fillShipping('John', 'Doe');
  await expect(page).toHaveURL(/payment/);
});

export { CheckoutPage };
