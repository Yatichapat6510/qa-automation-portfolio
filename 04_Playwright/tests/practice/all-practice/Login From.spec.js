// Task: เขียน locator สำหรับ Username, Password, Sign In (อย่างน้อย 2 วิธี)
// USERNAME FIELD

page.getByLabel('Username')             // ✅ Best — semantic label
page.getByPlaceholder('Enter username') // ✅ Good
page.locator('#username')                   // OK — ID เปลี่ยนได้
page.getByRole('textbox', { name: 'Username' })     // ✅ Best


// PASSWORD FIELD

page.getByLabel('Password')             // ✅ Best
page.getBylocator('#password')          // OK
page.locator('input[type="password"]')  // OK ถ้ามี 1 ตัวใน page


// SIGN IN BUTTON

page.getByRole('button', { name: 'Sign In' })       // ✅ Best
page.getByTestId('login-btn')           // ✅ Best — data-testid
page.getByText('Sign In')               // OK แต่อาจ match อื่น




// Task: เขียน locator สำหรับ Username, Password, Sign In (อย่างน้อย 2 วิธี)
import { test } from '@playwright/test';

test('locator examples for login form', async ({ page }) => {
	// USERNAME FIELD
	const usernameByLabel = page.getByLabel('Username');             // ✅ Best — semantic label
	const usernameByPlaceholder = page.getByPlaceholder('Enter username'); // ✅ Good
	const usernameById = page.locator('#username');                   // OK — ID เปลี่ยนได้
	const usernameByRole = page.getByRole('textbox', { name: 'Username' });     // ✅ Best

	// PASSWORD FIELD
	const passwordByLabel = page.getByLabel('Password');             // ✅ Best
	const passwordById = page.locator('#password');          // OK
	const passwordByType = page.locator('input[type="password"]');  // OK ถ้ามี 1 ตัวใน page

	// SIGN IN BUTTON
	const signInByRole = page.getByRole('button', { name: 'Sign In' });       // ✅ Best
	const signInByTestId = page.getByTestId('login-btn');           // ✅ Best — data-testid
	const signInByText = page.getByText('Sign In');               // OK แต่อาจ match อื่น

	// keep references to avoid unused variable warnings
	[usernameByLabel, usernameByPlaceholder, usernameById, usernameByRole,
	 passwordByLabel, passwordById, passwordByType,
	 signInByRole, signInByTestId, signInByText].forEach(x => x);
});


