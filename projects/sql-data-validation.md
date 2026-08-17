# SQL for QA and Data Validation

**Current material:** [`Workshops/Workshop/beginner_exercises.sql`](../Workshops/Workshop/beginner_exercises.sql)

## Target showcase layout

```text
qa-sql-data-validation/
├── queries/
│   ├── setup/
│   ├── validation/
│   └── cleanup/
├── docs/data-model.md
├── docs/test-data-strategy.md
└── README.md
```

## Portfolio scenarios to add

- Verify that an API-created order persists with the expected status, amount, and line items.
- Detect duplicate users or orphaned order records.
- Prepare deterministic test data and provide a safe cleanup query.
- Validate a business rule with joins, aggregation, and boundary values.

Never commit production data, customer PII, or working database credentials.
