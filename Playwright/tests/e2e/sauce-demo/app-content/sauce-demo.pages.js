import {
  acceptedUsernames,
  loginErrorMessages,
  sauceDemoPassword,
} from '../data/credentials.data.js';

const layout = (content, script = '') => `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>SauceDemo</title>
      <style>[hidden] { display: none; }</style>
    </head>
    <body>${content}<script>${script}</script></body>
  </html>`;

const cartHelpers = `
  const getCart = () => JSON.parse(localStorage.getItem('sauce-cart') || '[]');
  const setCart = cart => localStorage.setItem('sauce-cart', JSON.stringify(cart));
`;

export const sauceDemoPage = pathname => {
  if (pathname === '/' || pathname === '/index.html') {
    return layout(`
      <label for="user-name">Username</label>
      <input id="user-name" data-test="username" />
      <label for="password">Password</label>
      <input id="password" data-test="password" type="password" />
      <button id="login-button" data-test="login-button">Login</button>
      <h3 data-test="error" hidden></h3>`, `
        const acceptedUsernames = ${JSON.stringify(acceptedUsernames)};
        const expectedPassword = ${JSON.stringify(sauceDemoPassword)};
        const messages = ${JSON.stringify(loginErrorMessages)};
        const error = document.querySelector('[data-test=error]');

        document.querySelector('[data-test=login-button]').addEventListener('click', () => {
          const username = document.querySelector('[data-test=username]').value;
          const password = document.querySelector('[data-test=password]').value;

          if (!username) {
            error.textContent = messages.usernameRequired;
            error.hidden = false;
          } else if (!password) {
            error.textContent = messages.passwordRequired;
            error.hidden = false;
          } else if (!acceptedUsernames.includes(username) || password !== expectedPassword) {
            error.textContent = messages.invalidCredentials;
            error.hidden = false;
          } else if (username === 'locked_out_user') {
            error.textContent = messages.lockedOut;
            error.hidden = false;
          } else {
            window.location.href = '/inventory.html';
          }
        });`);
  }

  if (pathname === '/inventory.html') {
    return layout(`
      <h1 data-test="title">Products</h1>
      <a data-test="shopping-cart-link" href="/cart.html">
        Cart <span data-test="shopping-cart-badge" hidden></span>
      </a>
      <div data-test="inventory-list">
        <div data-test="inventory-item">
          <span data-test="inventory-item-name">Sauce Labs Backpack</span>
          <button data-test="add-to-cart-sauce-labs-backpack">Add to cart</button>
        </div>
      </div>`, `
        ${cartHelpers}
        const badge = document.querySelector('[data-test=shopping-cart-badge]');
        const updateBadge = () => {
          const count = getCart().length;
          badge.textContent = String(count);
          badge.hidden = count === 0;
        };

        document.querySelector('[data-test=add-to-cart-sauce-labs-backpack]').addEventListener('click', () => {
          setCart(['Sauce Labs Backpack']);
          updateBadge();
        });
        updateBadge();`);
  }

  if (pathname === '/cart.html') {
    return layout(`
      <div data-test="cart-list"></div>
      <button data-test="checkout">Checkout</button>`, `
        ${cartHelpers}
        document.querySelector('[data-test=cart-list]').innerHTML = getCart()
          .map(name => '<div data-test="cart-item"><span data-test="inventory-item-name">' + name + '</span></div>')
          .join('');
        document.querySelector('[data-test=checkout]').addEventListener('click', () => {
          window.location.href = '/checkout-step-one.html';
        });`);
  }

  if (pathname === '/checkout-step-one.html') {
    return layout(`
      <label>First Name <input data-test="firstName" /></label>
      <label>Last Name <input data-test="lastName" /></label>
      <label>Postal Code <input data-test="postalCode" /></label>
      <button data-test="continue">Continue</button>`, `
        document.querySelector('[data-test=continue]').addEventListener('click', () => {
          window.location.href = '/checkout-step-two.html';
        });`);
  }

  if (pathname === '/checkout-step-two.html') {
    return layout(`
      <div data-test="summary-info">Order summary</div>
      <button data-test="finish">Finish</button>`, `
        document.querySelector('[data-test=finish]').addEventListener('click', () => {
          localStorage.removeItem('sauce-cart');
          window.location.href = '/checkout-complete.html';
        });`);
  }

  if (pathname === '/checkout-complete.html') {
    return layout('<h2 data-test="complete-header">Thank you for your order!</h2>');
  }

  return undefined;
};
