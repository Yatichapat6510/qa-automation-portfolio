# Robot Framework UI and API Automation

**Implementation:** [`web/robot-framework/`](../web/robot-framework/)
**Stack:** Robot Framework, SeleniumLibrary, keyword-driven UI testing, API keywords

## Current evidence

- `tests/ui/`: login, product, cart, error, and control-flow practice suites.
- `tests/api/`: API and web integration practice.
- `resources/`: reusable UI/API keywords and variables.
- `e2e-flow/`: checkout-flow exercise.

## Presentation decision

Retain `sandbox/` and `practice/` as learning work. Promote one tagged UI flow and one API flow only after their dependencies and command are documented in the project README.

## Run and CI

`requirements.txt` pins the library ranges. Tests carry `smoke`, `regression` and `integration` tags, so `robot -d results -i smoke tests/` gives a repeatable smoke run. [`.github/workflows/robot.yml`](../.github/workflows/robot.yml) runs the suite under Xvfb and uploads `results/` as an artifact.

## Next steps

1. Promote one tagged UI flow (login to checkout) and one API flow into a short "start here" section in the project README.
2. Add a scrubbed screenshot of `report.html` under `assets/images/`.
3. Move the remaining exploratory files in `tests/` behind a `practice` tag or into `practice/`.
