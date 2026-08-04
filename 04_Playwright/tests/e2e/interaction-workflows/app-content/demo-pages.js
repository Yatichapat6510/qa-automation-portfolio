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
      <label>Full Name <input name="fullName" /></label>
      <label>Email <input name="email" type="email" /></label>
      <label>Password <input name="password" type="password" /></label>
      <label>Confirm Password <input name="confirmPassword" type="password" /></label>
      <label>Country <select name="country"><option>Thailand</option><option>Japan</option></select></label>
      <label><input name="newsletter" type="checkbox" /> Subscribe to newsletter</label>
      <button type="submit">Create Account</button>
    </form>
    <p id="success" hidden>Account created successfully</p>`, `
      document.querySelector('#registration-form').addEventListener('submit', event => {
        event.preventDefault();
        document.querySelector('#success').hidden = false;
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

  '/editor': layout(`<div contenteditable="true" aria-label="Rich text editor"></div>`),
};
