# Playwright repository rules

- Read `docs/PLAYWRIGHT_STRUCTURE.md` before adding, moving, or reclassifying a test.
- Every new test must have a named Playwright project owner or an explicit documented reason that it is an unregistered practice example.
- Classify every new module as **shared**, **project-specific**, or **test-specific**. A shared module needs two or more project consumers, or a documented exception.
- Do not create broad folders such as `misc`, `common`, `resources`, or `support`. Use responsibility-specific names such as `fixtures`, `data`, `api`, `pages`, `schemas`, or `utils`.
- A test that uses a custom fixture must import `test` and `expect` from that fixture entry point, not directly from `@playwright/test`.
- Project-specific tests must not import internals from another project. Shared modules must not depend on a project-specific module.
- Test data must not import tests or fixtures; page objects must not import test specifications; shared utilities must not contain business-project dependencies.
- After a structural change, run `npx.cmd playwright test --list` (or `npx playwright test --list` on non-Windows hosts).
- After changing a test, run every affected test and project. Before handoff, run the appropriate suite and report the actual result.
- Never delete assertions, skip tests, or alter test data merely to make a test pass. Do not delete a file until direct and indirect usage has been verified.
- Update `docs/TEST_DEPENDENCY_MAP.md` and `docs/PLAYWRIGHT_STRUCTURE.md` whenever a fixture, config, project, or shared dependency changes.
