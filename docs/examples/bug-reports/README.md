# Example Bug Reports

Defect reports written with the [bug-report template](../../templates/bug-report-template.md). BUG-001 to BUG-003 target **intentionally faulty accounts** on the public Sauce Demo practice site (`problem_user`, `performance_glitch_user`); BUG-004 and BUG-005 target intentional defects in the Sauce Labs My Demo App (Android) and were found or confirmed by the mobile automation suites. All behaviours are reproducible by any reviewer.

| ID | Title | Severity | Priority |
| --- | --- | --- | --- |
| [BUG-001](BUG-001-problem-user-identical-product-images.md) | Every product shows the same image for `problem_user` | Medium | P1 |
| [BUG-002](BUG-002-problem-user-checkout-last-name-overwrites-first-name.md) | Checkout: typing Last Name overwrites First Name | High | P0 |
| [BUG-003](BUG-003-performance-glitch-user-slow-login.md) | Login is noticeably slow for `performance_glitch_user` | Low | P2 |
| [BUG-004](BUG-004-bolt-tshirt-adds-ten-units.md) | Mobile: Add To Cart on "Sauce Labs Bolt T-Shirt" always adds 10 units | High | P1 |
| [BUG-005](BUG-005-catalog-crash-on-product-tap.md) | Mobile: app crashes when opening the 2nd or 7th+ product in the catalog | Critical | P0 |

Re-run the steps before quoting them: the site is a third-party demo and its behaviour can change.
