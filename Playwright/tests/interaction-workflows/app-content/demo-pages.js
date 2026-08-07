// In-memory HTTP resources served by the interaction-workflows fixture.
const layout = (content, script = '') => `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>Playwright interaction demo</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 2rem; }
        label, button, select, input { display: block; margin: .5rem 0; }
        [hidden] { display: none; }
        .board { display: flex; gap: 2rem; }
        .column { min-height: 8rem; width: 14rem; padding: 1rem; border: 1px solid #999; }
        .task-card { padding: .5rem; border: 1px solid #555; background: #eee; }
      </style>
    </head>
    <body>${content}<script>${script}</script></body>
  </html>`;

export const demoPages = {
  '/register': layout(`
    <h1>Create an account</h1>
    <form id="registration-form">
      <div class="field"><label for="fullName">Full Name</label><input id="fullName" name="fullName" /><div class="field-error" hidden></div></div>
      <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" /><div class="field-error" hidden></div></div>
      <div class="field"><label for="password">Password</label><input id="password" name="password" type="password" /><div class="field-error" hidden></div></div>
      <div class="field"><label for="confirmPassword">Confirm Password</label><input id="confirmPassword" name="confirmPassword" type="password" /><div class="field-error" hidden></div></div>
      <div class="field"><label for="country">Country</label><select id="country" name="country"><option>Thailand</option><option>Japan</option></select></div>
      <div class="field"><label><input id="newsletter" name="newsletter" type="checkbox" /> Subscribe to newsletter</label></div>
      <button type="submit">Create Account</button>
    </form>
    <p id="success" hidden>Account created successfully</p>`, `
      const form = document.querySelector('#registration-form');
      const successMessage = document.querySelector('#success');
      const emailInput = form.elements.email;
      const passwordInput = form.elements.password;
      const confirmInput = form.elements.confirmPassword;
      const fullNameInput = form.elements.fullName;

      // This script is embedded in a JavaScript template literal, so its regular
      // expression escapes must survive one parsing pass before reaching the page.
      const emailPattern = /^\\S+@\\S+\\.\\S+$/;
      const clearErrors = input => {
        const field = input.closest('.field');
        if (!field) return;
        field.querySelectorAll('.field-error').forEach(el => el.remove());
      };

      const showError = (input, message) => {
        const field = input.closest('.field');
        if (!field) return;
        const error = field.querySelector('.field-error');
        if (!error) return;
        console.log('showError', input.name, message, 'hiddenBefore=', error.hidden);
        if (!message) {
          error.hidden = true;
          error.textContent = '';
          console.log('hideError', input.name);
          return;
        }
        error.hidden = false;
        error.textContent = message;
        console.log('showErrorMessage', input.name, message);
      };

      const validateFullName = () => {
        const value = fullNameInput.value.trim();
        const message = value ? '' : 'Full Name is required';
        showError(fullNameInput, message);
        return !message;
      };

      const validateEmail = () => {
        const value = emailInput.value.trim();
        let message = '';
        if (!value) message = 'Email is required';
        else if (!emailPattern.test(value)) message = 'Invalid email format';
        showError(emailInput, message);
        return !message;
      };

      const validatePassword = () => {
        const value = passwordInput.value;
        let message = '';
        if (!value) message = 'Password is required';
        else if (value.length < 8) message = 'Password must be at least 8 characters';
        showError(passwordInput, message);
        return !message;
      };

      const validateConfirmPassword = () => {
        const value = confirmInput.value;
        let message = '';
        if (!value) message = 'Confirm Password is required';
        else if (value !== passwordInput.value) message = 'Passwords do not match';
        showError(confirmInput, message);
        return !message;
      };

      emailInput.addEventListener('blur', validateEmail);
      passwordInput.addEventListener('blur', validatePassword);
      fullNameInput.addEventListener('blur', validateFullName);
      confirmInput.addEventListener('blur', validateConfirmPassword);

      emailInput.addEventListener('input', validateEmail);
      passwordInput.addEventListener('input', validatePassword);
      fullNameInput.addEventListener('input', validateFullName);
      confirmInput.addEventListener('input', validateConfirmPassword);

      form.addEventListener('submit', event => {
        event.preventDefault();
        successMessage.hidden = true;
        const valid = [
          validateFullName(),
          validateEmail(),
          validatePassword(),
          validateConfirmPassword(),
        ].every(Boolean);

        if (valid) {
          successMessage.hidden = false;
        }
      });`),

  '/settings': layout(`
    <label>Skills
      <select name="skills" multiple size="3">
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
        <option value="TypeScript">TypeScript</option>
      </select>
    </label>
    <label>Proficiency
      <select name="proficiency"><option>Beginner</option><option>Intermediate</option></select>
    </label>`),

  '/': layout(`
    <button id="account-button" aria-haspopup="menu">Account</button>
    <div id="account-menu" role="menu" hidden><a role="menuitem" href="/profile">My Profile</a></div>
    <div role="img" aria-label="Help" id="help-icon" tabindex="0">?</div>
    <div role="tooltip" id="tooltip" hidden>Click for help</div>`, `
      const menu = document.querySelector('#account-menu');
      document.querySelector('#account-button').addEventListener('mouseenter', () => { menu.hidden = false; });
      const tooltip = document.querySelector('#tooltip');
      document.querySelector('#help-icon').addEventListener('mouseenter', () => { tooltip.hidden = false; });`),

  '/login': layout(`
    <form id="login-form">
      <label>Username <input name="username" /></label>
      <label>Password <input name="password" type="password" /></label>
      <button type="submit">Sign in</button>
    </form>`, `
      document.querySelector('#login-form').addEventListener('submit', event => {
        event.preventDefault();
        window.location.href = '/dashboard';
      });`),

  '/dashboard': layout(`<h1>Dashboard</h1><div role="dialog">Welcome</div>`, `
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') document.querySelector('[role=dialog]').hidden = true;
    });`),

  '/profile': layout(`
    <label>Profile Photo <input name="profilePhoto" type="file" accept="image/*" /></label>
    <label>Documents <input name="documents" type="file" multiple /></label>
    <p id="file-name"></p><p id="file-error" hidden>Please upload an image file</p>`, `
      const photo = document.querySelector('[name=profilePhoto]');
      photo.addEventListener('change', () => {
        const file = photo.files[0];
        document.querySelector('#file-name').textContent = file?.name || '';
        document.querySelector('#file-error').hidden = !file || file.type.startsWith('image/');
      });`),

  '/kanban': layout(`
    <div class="board">
      <div class="column" id="todo"><h2>Todo</h2><div class="task-card" draggable="true">Fix login bug</div></div>
      <div class="column" id="in-progress"><h2>In Progress</h2></div>
    </div>`, `
      const card = document.querySelector('.task-card');
      card.addEventListener('dragstart', event => event.dataTransfer.setData('text/plain', 'task'));
      const target = document.querySelector('#in-progress');
      target.addEventListener('dragover', event => event.preventDefault());
      target.addEventListener('drop', event => { event.preventDefault(); target.append(card); });`),

  '/editor': layout(`<div contenteditable="true" role="textbox" aria-label="Rich text editor"></div>`),

  '/users': layout(`
    <h1>Users</h1>
    <p id="error" hidden>Something went wrong</p><button id="retry" hidden>Retry</button>
    <table><thead><tr><th>Name</th><th>Role</th></tr></thead><tbody></tbody></table>
    <button id="create-user">Create User</button>`, `
      const tableBody = document.querySelector('tbody');
      const error = document.querySelector('#error');
      const retry = document.querySelector('#retry');
      const loadUsers = async () => {
        const response = await fetch('/api/users');
        if (!response.ok) {
          error.hidden = false;
          retry.hidden = false;
          return;
        }
        const users = await response.json();
        tableBody.replaceChildren(...users.map(({ name, role }) => {
          const row = document.createElement('tr');
          row.innerHTML = '<td>' + name + '</td><td>' + role + '</td>';
          return row;
        }));
      };
      retry.addEventListener('click', loadUsers);
      document.querySelector('#create-user').addEventListener('click', () =>
        fetch('/api/users', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'New user', role: 'user' }) })
      );
      loadUsers();`),
};

const sauceProducts = [
  ['Sauce Labs Backpack', 29.99],
  ['Sauce Labs Bike Light', 9.99],
  ['Sauce Labs Bolt T-Shirt', 15.99],
  ['Sauce Labs Fleece Jacket', 49.99],
  ['Sauce Labs Onesie', 7.99],
  ['Test.allTheThings() T-Shirt (Red)', 15.99],
];

const sauceLayout = (content, script = '') => layout(content, script);
const cartScript = `
  const getCart = () => JSON.parse(localStorage.getItem('sauce-cart') || '[]');
  const setCart = cart => localStorage.setItem('sauce-cart', JSON.stringify(cart));
`;

export const sauceDemoPage = pathname => {
  if (pathname === '/' || pathname === '/index.html') {
    return sauceLayout(`
      <label for="user-name">Username</label><input id="user-name" data-test="username" />
      <label for="password">Password</label><input id="password" data-test="password" type="password" />
      <button id="login-button" data-test="login-button">Login</button><h3 data-test="error" hidden></h3>`, `
        const error = document.querySelector('[data-test=error]');
        const acceptedUsernames = [
          'standard_user',
          'locked_out_user',
          'problem_user',
          'performance_glitch_user',
          'error_user',
          'visual_user',
        ];
        document.querySelector('#login-button').addEventListener('click', () => {
          const username = document.querySelector('#user-name').value;
          const password = document.querySelector('#password').value;
          if (!username) {
            error.textContent = 'Epic sadface: Username is required';
            error.hidden = false;
          } else if (!password) {
            error.textContent = 'Epic sadface: Password is required';
            error.hidden = false;
          } else if (!acceptedUsernames.includes(username) || password !== 'secret_sauce') {
            error.textContent = 'Epic sadface: Username and password do not match any user in this service';
            error.hidden = false;
          } else if (username === 'locked_out_user') {
            error.textContent = 'Epic sadface: Sorry, this user has been locked out.';
            error.hidden = false;
          } else {
            window.location.href = '/inventory.html';
          }
        });`);
  }

  if (pathname === '/inventory.html') {
    return sauceLayout(`
      <button id="react-burger-menu-btn">Menu</button><button id="logout_sidebar_link" hidden>Logout</button>
      <a class="shopping_cart_link" href="/cart.html">Cart <span class="shopping_cart_badge" hidden></span></a>
      <h1 class="title">Products</h1>
      <select class="product_sort_container" data-test="product_sort_container"><option value="az">Name (A to Z)</option><option value="lohi">Price (low to high)</option></select>
      <div id="inventory"></div>`, `
        ${cartScript}
        const products = ${JSON.stringify(sauceProducts)};
        const inventory = document.querySelector('#inventory');
        const badge = document.querySelector('.shopping_cart_badge');
        const updateBadge = () => { const count = getCart().length; badge.textContent = count; badge.hidden = count === 0; };
        const render = () => {
          const selected = document.querySelector('.product_sort_container').value;
          const items = [...products].sort(selected === 'lohi' ? (a, b) => a[1] - b[1] : (a, b) => a[0].localeCompare(b[0]));
          inventory.innerHTML = items.map(([name, price]) => {
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            const inCart = getCart().includes(name);
            return '<div class="inventory_item"><div class="inventory_item_img"><img alt="' + name + '" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="></div><div class="inventory_item_name">' + name + '</div><div class="inventory_item_price">$' + price.toFixed(2) + '</div><button data-test="' + (inCart ? 'remove-' : 'add-to-cart-') + slug + '" data-name="' + name + '">' + (inCart ? 'Remove' : 'Add to cart') + '</button></div>';
          }).join('');
          inventory.querySelectorAll('button[data-name]').forEach(button => button.addEventListener('click', () => {
            const cart = getCart(); const name = button.dataset.name;
            setCart(cart.includes(name) ? cart.filter(item => item !== name) : [...cart, name]); render(); updateBadge();
          }));
        };
        document.querySelector('.product_sort_container').addEventListener('change', render);
        document.querySelector('#react-burger-menu-btn').addEventListener('click', () => document.querySelector('#logout_sidebar_link').hidden = false);
        document.querySelector('#logout_sidebar_link').addEventListener('click', () => { localStorage.removeItem('sauce-cart'); window.location.href = '/'; });
        render(); updateBadge();`);
  }

  if (pathname === '/cart.html') {
    return sauceLayout(`<a class="shopping_cart_link" href="/cart.html">Cart</a><div id="cart"></div><button data-test="checkout">Checkout</button>`, `
      ${cartScript}
      const products = ${JSON.stringify(sauceProducts)};
      document.querySelector('#cart').innerHTML = getCart().map(name => '<div class="cart_item"><span>' + name + '</span><button data-name="' + name + '">Remove</button></div>').join('');
      document.querySelectorAll('.cart_item button').forEach(button => button.addEventListener('click', () => { setCart(getCart().filter(name => name !== button.dataset.name)); button.closest('.cart_item').remove(); }));
      document.querySelector('[data-test=checkout]').addEventListener('click', () => window.location.href = '/checkout-step-one.html');`);
  }

  if (pathname === '/checkout-step-one.html') {
    return sauceLayout(`
      <label>First Name <input data-test="firstName"></label><label>Last Name <input data-test="lastName"></label><label>Postal Code <input data-test="postalCode"></label>
      <button data-test="continue">Continue</button><p data-test="error" hidden></p>`, `
        document.querySelector('[data-test=continue]').addEventListener('click', () => {
          const firstName = document.querySelector('[data-test=firstName]').value;
          const error = document.querySelector('[data-test=error]');
          if (!firstName) { error.textContent = 'Error: First Name is required'; error.hidden = false; return; }
          window.location.href = '/checkout-step-two.html';
        });`);
  }

  if (pathname === '/checkout-step-two.html') {
    return sauceLayout(`<div class="summary_info">Order summary</div><button data-test="finish">Finish</button>`, `
      document.querySelector('[data-test=finish]').addEventListener('click', () => { localStorage.removeItem('sauce-cart'); window.location.href = '/checkout-complete.html'; });`);
  }

  if (pathname === '/checkout-complete.html') {
    return sauceLayout('<h2 class="complete-header">Thank you for your order!</h2>');
  }

  return undefined;
};
