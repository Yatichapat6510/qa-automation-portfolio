# API Testing and Automation

**Current material:** [`Workshops/QA-Automation-Workshop/week02-api-testing`](../Workshops/QA-Automation-Workshop/week02-api-testing/) and [`Workshops/Workshop/beginner_postman_collection.json`](../Workshops/Workshop/beginner_postman_collection.json)

## Current evidence

- Postman collections for request and assertion practice.
- Python API tests against the workshop demo application.
- A local Flask demo API in `Workshops/QA-Automation-Workshop/demo-app/`.

## Target showcase layout

```text
api-automation/
├── collections/          # reviewed Postman collection
├── environments/         # *.example.json only; no secrets
├── data/                 # CSV/JSON data-driven inputs
├── scripts/              # Newman command or npm scripts
├── docs/                 # endpoint coverage and API test strategy
└── reports/              # curated sample only; full reports belong in CI artifacts
```

## Next steps

1. Select one API domain, for example products/orders in the local demo app.
2. Add positive, validation, authentication, and authorization cases.
3. Run the selected Postman collection with Newman in CI.
4. Add schema/contract checks and a short endpoint-coverage table.
