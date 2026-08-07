export const acceptedUsernames = Object.freeze([
  'standard_user',
  'locked_out_user',
  'problem_user',
  'performance_glitch_user',
  'error_user',
  'visual_user',
]);

export const loginCapableUsernames = Object.freeze(
  acceptedUsernames.filter(username => username !== 'locked_out_user'),
);

export const sauceDemoPassword = 'secret_sauce';

export const validCredentials = Object.freeze({
  username: 'standard_user',
  password: sauceDemoPassword,
});

export const invalidCredentials = Object.freeze({
  username: 'not_a_sauce_user',
  password: 'wrong_password',
});

export const loginErrorMessages = Object.freeze({
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
  usernameRequired: 'Epic sadface: Username is required',
  passwordRequired: 'Epic sadface: Password is required',
  lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
});

export const checkoutCustomer = Object.freeze({
  firstName: 'QA',
  lastName: 'Automation',
  postalCode: '10110',
});
