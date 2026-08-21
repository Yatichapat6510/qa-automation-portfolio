# API Automation with Postman and Newman

Postman collections and environments for API regression testing. The default CI suite uses JSONPlaceholder, a public deterministic test API that does not require a secret.

## Project structure

```text
api-automation/
├── .github/workflows/newman-run.yml
├── collections/
│   ├── practice/practice-api-testing-demo.postman_collection.json
│   └── restful-api/
│       ├── restful-api-basic-crud.postman_collection.json
│       └── restful-api-authenticated-flow.postman_collection.json
├── environments/
│   ├── jsonplaceholder.postman_environment.json
│   └── restful-api.postman_environment.json
├── reports/                         # generated locally; excluded from Git
├── package.json
└── README.md
```

## Test suites

| Command | Scope | Credentials |
| --- | --- | --- |
| `npm test` | JSONPlaceholder: Posts, Users, Comments | None; runs in CI |
| `npm run test:restful-public` | restful-api.dev public CRUD and post-delete 404 | None |
| `npm run test:restful-auth` | Register, JWT, and collection CRUD | `apiKey` required |

The default suite contains nine requests and validates status codes, response type/schema, payload values, the create response, and DELETE response format. It produces `reports/newman-report.html`.

## Local setup and execution

```powershell
npm install
npm test
Start-Process reports/newman-report.html
```

To run the authenticated suite, obtain an API key from restful-api.dev, then either enter it only in your local environment file (never commit it) or override the example value at runtime:

```powershell
npm run test:restful-auth -- --env-var "apiKey=YOUR_RESTFUL_API_KEY"
```

The authenticated collection generates a unique registration email for every run, saves the JWT in a collection variable, sends it as a Bearer token, saves the created object ID, and deletes that object at the end.

## Public API quota

`api.restful-api.dev` limits its unauthenticated public API to 50 requests per rolling 24-hour period. When that quota is exhausted, the service returns `405 Method Not Allowed` with an error message about the daily request limit. This is an external service limit, not a failed API assertion or a Postman configuration issue.

- For repeatable practice and CI, run `npm test` or the `Practice API Testing Demo` collection with the `JSONPlaceholder - CI` environment.
- For the authenticated collection, set a personal `apiKey` only in the Local/Current value of `restful-api.dev - Example`, then run steps 9–12.
- Wait for the 24-hour window to reset before re-running the public CRUD collection.

## GitHub Actions

`.github/workflows/newman-run.yml` runs the default suite on every push and pull request to `main`, then uploads the HTML report as an artifact. To also run the authenticated suite, add a repository Actions secret named `RESTFUL_API_KEY`; the job stays skipped when the secret is absent, rather than running with an empty credential.

## Publish safely

```powershell
git add .
git commit -m "Add Newman API automation and CI workflow"
git push origin main
```

Do not commit API keys, JWTs, real user credentials, `node_modules`, or generated reports.
