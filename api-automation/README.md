# API Testing and Automation

This project area contains Postman collections prepared for API testing practice and future Newman-based automation.

## Collections

| Collection | Focus |
| --- | --- |
| [`collections/restful-api/restful-api-basic-crud.postman_collection.json`](collections/restful-api/restful-api-basic-crud.postman_collection.json) | REST CRUD fundamentals: GET, POST, PUT, PATCH, DELETE, and post-delete validation |
| [`collections/restful-api/restful-api-authenticated-flow.postman_collection.json`](collections/restful-api/restful-api-authenticated-flow.postman_collection.json) | REST CRUD plus error handling, registration, and authenticated collection operations |
| [`collections/practice/practice-api-testing-demo.postman_collection.json`](collections/practice/practice-api-testing-demo.postman_collection.json) | Practice scenarios for Posts, Users, and Comments |

## Import and run in Postman

1. Open Postman and select **Import**.
2. Choose one collection JSON file from `collections/`.
3. Create or select a safe local/demo environment.
4. Supply variables through an environment file or Postman variables; do not save real tokens or passwords inside a committed collection.

## Planned structure

```text
collections/     # Versioned Postman collection definitions
environments/    # *.example.postman_environment.json only
data/            # Synthetic JSON/CSV inputs for data-driven tests
scripts/         # Newman commands or helpers
docs/            # Test strategy and endpoint coverage
reports/         # Generated local output; keep out of Git
```

## Before publishing

- Remove any real API key, token, password, personal URL, or customer data.
- Use placeholders such as `{{base_url}}` and `{{api_token}}`.
- Export collections using Postman Collection v2.1.
- Add a Newman workflow only after the collection runs reliably with a safe environment.
