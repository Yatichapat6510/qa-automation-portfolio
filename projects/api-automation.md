# API Testing and Automation

**Implementation:** [`api/postman-newman/`](../api/postman-newman/)
**Stack:** Postman collections, Newman, htmlextra reporter, GitHub Actions

## Current evidence

- [Practice suite: Posts, Users, Comments (JSONPlaceholder)](../api/postman-newman/collections/practice/practice-api-testing-demo.postman_collection.json): 9 requests, runs in CI with no secret.
- [REST public CRUD](../api/postman-newman/collections/restful-api/restful-api-basic-crud.postman_collection.json) and [authenticated flow](../api/postman-newman/collections/restful-api/restful-api-authenticated-flow.postman_collection.json) against restful-api.dev.
- [QA review notes](../api/postman-newman/api-testing-auth-qa-review.th.md) (Thai): findings from reviewing the original authenticated collection and the fixes applied.
- CI: [`newman.yml`](../.github/workflows/newman.yml) runs the default suite and uploads the HTML report; the authenticated suite runs only when the `RESTFUL_API_KEY` secret exists.

## What the assertions cover

Status codes, response time (SLA), JSON content type, JSON schema, business values, ID/token chaining, and cleanup of created data.

## Next steps

1. Add negative and authorization cases as a separate collection so regression runs stay deterministic.
2. Add an endpoint-coverage table and a short API test strategy under `api/postman-newman/docs/`.
3. Add data-driven runs (CSV/JSON iteration data).
4. Note the external quota: restful-api.dev limits unauthenticated calls, so keep JSONPlaceholder as the CI default.
