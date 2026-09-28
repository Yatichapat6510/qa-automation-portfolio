# Portfolio Structure Decision

## Chosen model: capability-grouped portfolio hub

One repository is the portfolio hub. Runnable projects are grouped by **capability** (web, api, mobile) so a reviewer can find them without knowing the tool, and learning material is kept apart from showcase work.

```text
qa-automation-portfolio/
├── web/
│   ├── playwright/          # Flagship executable project
│   ├── cypress/
│   └── robot-framework/
├── api/postman-newman/
├── mobile/{appium,maestro}/
├── learning/workshops/      # Course and workshop source material
├── projects/                # Showcase pages that link to the implementations
├── docs/                    # Strategy, roadmap, templates, examples, internal notes
├── assets/                  # Selected GIFs and screenshots only
└── .github/workflows/       # Every CI workflow lives here
```

## Naming conventions

- Folders and files: lowercase `kebab-case`, English only, no spaces, no emoji.
- Robot Framework files: `snake_case.robot` (matches keyword style).
- Postman: `<api>-<scope>.postman_collection.json` and `<api>[-variant].postman_environment.json`.
- One README per runnable project; one showcase page per capability in `projects/`.

## Rules

1. **CI lives only in `.github/workflows/`.** GitHub ignores workflows nested in sub-folders. Each workflow uses `working-directory` and a `paths` filter for its project.
2. **Each project owns its dependencies** (`package.json`, `requirements.txt`). The repository root has no test runner.
3. **Generated output is never committed** (`results/`, `playwright-report/`, `ortoni-report/`, `node_modules/`, caches). Publish reports as CI artifacts.
4. **Line endings are normalised** by `.gitattributes` (`eol=lf`) so Windows and CI produce no noisy diffs.

## Promotion rule (learning → showcase)

Move a learning exercise into a featured project only when all conditions are met:

1. It represents a business scenario, not only a tool exercise.
2. It has readable names, stable locators/test data and repeatable local execution.
3. It has a project README, test strategy and a small set of curated evidence.
4. It runs in CI or has a documented reason why external infrastructure is required.

## History

An earlier layout kept `Playwright/`, `cypress/`, `Robot-Framework/`, `api-automation/`, `Appium/`, `Maestro/` and `Workshops/` at the repository root. They were moved (with their internal structure unchanged, so relative imports still work) into the grouping above. Git tracks these as renames.
