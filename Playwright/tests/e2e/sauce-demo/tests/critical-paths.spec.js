import { test, expect } from '../fixtures/app.fixture.js';
import {
  checkoutCustomer,
  invalidCredentials,
  loginCapableUsernames,
  loginErrorMessages,
  sauceDemoPassword,
} from '../data/credentials.data.js';

test.describe('SauceDemo authentication', () => {
  for (const username of loginCapableUsernames) {
    test(`allows accepted user ${username} to open inventory`, async ({ loginPage, inventoryPage }) => {
      await loginPage.open();
      await loginPage.login(username, sauceDemoPassword);

      await expect(inventoryPage.inventoryList).toBeVisible();
      await expect(loginPage.page).toHaveURL(/\/inventory\.html$/);
    });
  }

  test('rejects locked_out_user', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('locked_out_user', sauceDemoPassword);

    await expect(loginPage.errorMessage).toHaveText(loginErrorMessages.lockedOut);
  });

  test('shows the exact error for invalid credentials', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(invalidCredentials.username, invalidCredentials.password);

    await expect(loginPage.errorMessage).toHaveText(loginErrorMessages.invalidCredentials);
  });

  test('shows the exact error when username is missing', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('', sauceDemoPassword);

    await expect(loginPage.errorMessage).toHaveText(loginErrorMessages.usernameRequired);
  });

  test('shows the exact error when password is missing', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('standard_user', '');

    await expect(loginPage.errorMessage).toHaveText(loginErrorMessages.passwordRequired);
  });
});

test.describe('SauceDemo shopping critical paths', () => {
  test('adds a backpack and updates the cart badge', async ({ authenticatedApp }) => {
    await authenticatedApp.inventoryPage.addBackpackToCart();

    await expect(authenticatedApp.inventoryPage.shoppingCartBadge).toHaveText('1');
  });

  test('shows the selected backpack in the cart', async ({ authenticatedApp }) => {
    await authenticatedApp.inventoryPage.addBackpackToCart();
    await authenticatedApp.inventoryPage.openCart();

    await expect(authenticatedApp.cartPage.cartList).toBeVisible();
    await expect(authenticatedApp.cartPage.backpackItem).toBeVisible();
  });

  test('completes checkout with valid customer information', async ({ authenticatedApp }) => {
    await authenticatedApp.inventoryPage.addBackpackToCart();
    await authenticatedApp.inventoryPage.openCart();
    await authenticatedApp.cartPage.checkout();
    await authenticatedApp.checkoutPage.provideShippingInformation(checkoutCustomer);
    await authenticatedApp.checkoutPage.completeOrder();

    await expect(authenticatedApp.checkoutPage.completionHeading).toHaveText(
      'Thank you for your order!',
    );
  });
});
