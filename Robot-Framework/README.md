# Robot Framework UI and API Automation

**Framework:** Robot Framework with SeleniumLibrary and reusable keyword resources

## Project map

```text
tests/
├── ui/                 # login, products, cart, and error scenarios
└── api/                # API and web integration practice
resources/              # UI/API keywords and variables
Full E2E Flow/          # checkout exercise
practice/ and sandbox/  # learning and experiments, not featured evidence
results/                # generated report output; do not treat as source code
```

## Run guidance

Install the exact Robot Framework, SeleniumLibrary, RequestsLibrary, browser driver, and Python versions used in your local environment before publishing a reproducible command. Then add the verified command below.

```powershell
# Replace with the command confirmed on a clean environment.
robot --include smoke tests
```

## Portfolio scope

Promote a small tagged smoke suite for the login/cart path and one API scenario. Keep experiments in `sandbox/` and locator drills in `practice/` as learning evidence.

## Next steps

1. Create a version-pinned `requirements.txt` after confirming installed packages.
2. Add `docs/portfolio-test-strategy.md` with exact coverage and test data.
3. Add CI only after the suite is repeatable on a clean machine.
