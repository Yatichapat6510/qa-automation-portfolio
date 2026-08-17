# API Testing and Automation

**Implementation:** [`api-automation/`](../api-automation/)

## Current evidence

- [REST CRUD basics](../api-automation/collections/restful-api/restful-api-basic-crud.postman_collection.json)
- [REST authenticated flow](../api-automation/collections/restful-api/restful-api-authenticated-flow.postman_collection.json)
- [Posts, Users, and Comments practice](../api-automation/collections/practice/practice-api-testing-demo.postman_collection.json)
- The collections are organised separately from workshop source material so they can become a standalone featured API project.

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
