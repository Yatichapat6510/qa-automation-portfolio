# Robot Framework UI and API Automation

**Implementation:** [`Robot-Framework/`](../Robot-Framework/)
**Stack:** Robot Framework, SeleniumLibrary, keyword-driven UI testing, API keywords

## Current evidence

- `tests/ui/`: login, product, cart, error, and control-flow practice suites.
- `tests/api/`: API and web integration practice.
- `resources/`: reusable UI/API keywords and variables.
- `Full E2E Flow/`: checkout-flow exercise.

## Presentation decision

Retain `sandbox/` and `practice/` as learning work. Promote one tagged UI flow and one API flow only after their dependencies and command are documented in the project README.

## Next steps

1. Add a `requirements.txt` after confirming the installed library versions.
2. Document `robot --include smoke tests` as a repeatable smoke command.
3. Publish `log.html`/`report.html` as CI artifacts; keep only one scrubbed screenshot in the repository.
