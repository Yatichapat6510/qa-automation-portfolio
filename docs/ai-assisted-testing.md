# AI-Assisted Testing: Reviewable Workflow

AI can accelerate brainstorming and drafting. It does not replace QA judgment, product understanding, or review.

## Allowed use cases

- Draft boundary, negative, and equivalence-partition test ideas from a scrubbed requirement.
- Generate synthetic test data without personal or confidential data.
- Suggest first-pass selectors, assertions, or refactoring ideas for human review.
- Summarise a non-sensitive test report into follow-up questions.

## Required human review

Before committing any AI-assisted output, verify:

1. Business rules and acceptance criteria are correctly understood.
2. The scenario is feasible in the test environment.
3. Assertions are meaningful and not duplicated.
4. Credentials, tokens, internal URLs, PII, and customer data were never shared.
5. The final test has an appropriate risk priority.

## Suggested evidence format

When ready, add a project-local folder:

```text
docs/ai-assisted-testing/
├── prompt-template.md
├── raw-output-sanitised.md
├── human-review-notes.md
└── final-test-scenarios.md
```

Only publish sanitised inputs and outputs.
