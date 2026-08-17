# Portfolio Structure Decision

## Chosen model: Hybrid portfolio hub

This repository is the central portfolio hub. Runnable framework projects remain in their existing roots so their current imports, test configuration, package files, and CI paths do not break.

```text
qa-automation-portfolio/
├── Playwright/                 # Flagship executable project
├── cypress/                    # Executable Cypress project
├── Robot-Framework/            # Executable Robot Framework project
├── Workshops/                  # Learning lab / source material
├── projects/                   # Showcase pages that link to the implementations
├── docs/                       # Strategy, evidence, templates, and roadmap
└── assets/                     # Selected presentation assets only
```

## Why no test scripts were moved

Several suites use relative imports, project-specific configuration, and workflow paths. Moving scripts without updating them would risk breaking currently runnable automation. The safe first step is to keep code stable and add a clear presentation layer. Once a suite is independently verified, it can be extracted to its own GitHub repository if desired.

## Promotion rule

Move a learning exercise into a featured project only when all conditions are met:

1. It represents a business scenario, not only a tool exercise.
2. It has readable names, stable locators/test data, and repeatable local execution.
3. It has a project README, test strategy, and a small set of curated evidence.
4. It runs successfully in CI or has a documented reason why external infrastructure is required.
