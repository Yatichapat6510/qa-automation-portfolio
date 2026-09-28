# BUG-001: Every product shows the same image for `problem_user`

| Field | Value |
| --- | --- |
| Environment | https://www.saucedemo.com, desktop Chrome (latest) |
| Build / version | Public demo site (no version shown) |
| Account | `problem_user` / shared demo password |
| Severity | Medium (feature works, content is wrong) |
| Priority | P1 (visible on the first screen after login) |
| Type | Functional / content |

## Summary

After logging in as `problem_user`, the inventory page displays the same product image on every item instead of each product's own image.

## Steps to reproduce

1. Open https://www.saucedemo.com.
2. Log in as `problem_user`.
3. Look at the product list on the Products page.

## Expected result

Each product shows its own image (backpack, bike light, T-shirt, and so on), as it does for `standard_user`.

## Actual result

All product cards show the same image.

## Evidence

Attach: screenshot of the inventory page for `problem_user` and for `standard_user` side by side. Optional: DOM snapshot showing identical `src` values.

## Impact and risk

Users cannot visually identify products, which lowers trust and can lead to wrong purchases.

## Suggested automation

Assert that image `src` values on the inventory page are unique (Playwright: collect `.inventory_item_img img` sources into a `Set` and compare its size with the item count). Tag as `@visual` and run for `standard_user` as a control.
