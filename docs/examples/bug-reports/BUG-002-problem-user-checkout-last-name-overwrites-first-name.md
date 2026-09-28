# BUG-002: Checkout: typing Last Name overwrites First Name

| Field | Value |
| --- | --- |
| Environment | https://www.saucedemo.com, desktop Chrome (latest) |
| Account | `problem_user` |
| Severity | High (blocks a correct checkout) |
| Priority | P0 (checkout is a critical business path) |
| Type | Functional / form handling |

## Summary

On the checkout information form, entering a value in **Last Name** changes the **First Name** field, so the user cannot submit valid, distinct values.

## Steps to reproduce

1. Log in as `problem_user`.
2. Add any product to the cart and open the cart.
3. Select **Checkout**.
4. Type `Ada` into **First Name**.
5. Type `Lovelace` into **Last Name**.

## Expected result

First Name keeps `Ada`; Last Name shows `Lovelace`.

## Actual result

First Name is replaced by the Last Name value, and the Last Name field stays empty, so the form cannot be completed correctly.

## Impact and risk

Orders cannot be placed with correct customer details. It blocks a P0 flow for this account type.

## Suggested automation

Data-driven form test: fill each field, assert `inputValue()` of every field before continuing. Run it for both `standard_user` (control) and `problem_user` (expected to fail until fixed; mark with `test.fail()` and a link to this report).
