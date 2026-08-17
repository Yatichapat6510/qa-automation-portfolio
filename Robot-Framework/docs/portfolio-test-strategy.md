# Robot Framework Portfolio Test Strategy

## Featured test candidates

| Area | Candidate file | Status to confirm |
| --- | --- | --- |
| Login | `tests/ui/login/login_test.robot` | Verify repeatable smoke run |
| Cart | `tests/ui/cart/test_verify_total_price.robot` | Verify data and assertions |
| API | `tests/api/test_2_4_API n Web.robot` | Document endpoint and dependency |

## Before marking a candidate as featured

- Confirm it runs from a clean environment.
- Move credentials and URLs to safe variables only if the script is deliberately refactored later.
- Add meaningful tags such as `smoke`, `regression`, and feature name.
- Capture report evidence from a fresh run, not from an old local result.
