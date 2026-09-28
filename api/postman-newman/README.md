# API Automation with Postman and Newman

Postman collections and environments for API regression testing, run headlessly with Newman and reported with htmlextra. The default CI suite uses JSONPlaceholder, a public deterministic test API that needs no secret.

## Project structure

```text
api/postman-newman/
├── collections/
│   ├── practice/
│   │   ├── practice-api-testing-demo.postman_collection.json      # default CI suite (9 requests)
│   │   └── jsonplaceholder-learning-framework.postman_collection.json
│   └── restful-api/
│       ├── restful-api-basic-crud.postman_collection.json
│       ├── restful-api-authenticated-flow.postman_collection.json
│       ├── restful-api-auth-qa-reviewed.postman_collection.json  # reference: reviewed version
│       └── restful-api-auth-original.postman_collection.json     # reference: before review
├── environments/
│   ├── jsonplaceholder.postman_environment.json
│   ├── restful-api-public.postman_environment.json
│   └── restful-api-auth.postman_environment.json                 # apiKey left empty on purpose
├── reports/                    # generated locally; ignored by Git
├── api-testing-auth-qa-review.th.md   # QA review notes (Thai)
├── package.json
└── README.md
```

## Test suites

| Command | Scope | Credentials |
| --- | --- | --- |
| `npm test` | JSONPlaceholder: Posts, Users, Comments | None; runs in CI |
| `npm run test:restful-public` | restful-api.dev public CRUD and post-delete 404 | None |
| `npm run test:restful-auth` | Register, JWT, collection CRUD | `apiKey` required |

The default suite validates status codes, response type and schema, payload values, the create response and the DELETE response format, and produces `reports/newman-report.html`.

## Run locally

```bash
npm ci
npm test
# open reports/newman-report.html
```

To run the authenticated suite, get an API key from restful-api.dev and pass it at runtime. Never store it in a file that is committed.

```bash
npm run test:restful-auth -- --env-var "apiKey=YOUR_RESTFUL_API_KEY"
```

The authenticated collection generates a unique registration email per run, saves the JWT in a collection variable, sends it as a Bearer token, saves the created object ID and deletes it at the end.

## Public API quota

`api.restful-api.dev` limits unauthenticated use to 50 requests per rolling 24 hours. When exhausted it returns `405 Method Not Allowed` with a daily-limit message. This is an external limit, not an assertion failure. Use `npm test` (JSONPlaceholder) for repeatable practice and CI.

## GitHub Actions

[`.github/workflows/newman.yml`](../../.github/workflows/newman.yml) (repository root) runs the default suite on relevant pushes and pull requests and uploads the HTML report. Add a repository secret named `RESTFUL_API_KEY` to also run the authenticated suite; without it those steps are skipped.

## Conventions

Collection and environment files use `<api>-<scope>.postman_collection.json` naming. Do not commit API keys, JWTs, real credentials, `node_modules` or generated reports.
