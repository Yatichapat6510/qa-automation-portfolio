# QA Strategy

## Goal

Demonstrate the ability to design, automate, execute, and communicate quality checks across UI, API, data, and performance layers.

## Risk-based test selection

| Priority | Typical risk | Example coverage |
| --- | --- | --- |
| P0 | Customer cannot access or complete a purchase | login, cart, checkout, order confirmation |
| P1 | Core feature gives incorrect information or state | sorting, inventory, form validation, API response fields |
| P2 | Secondary behaviour or presentation issue | navigation, visual layout, non-critical preferences |

## Test pyramid intent

- Prefer API/data setup and validation where they make tests faster and more stable.
- Keep a small UI smoke suite for critical business journeys.
- Use broader UI regression tests selectively, not as the only verification layer.
- Use JMeter for an explicitly defined performance question, not as a generic load run.

## Evidence standard

Every featured project should include:

1. Scope and system-under-test description.
2. Risk-based scenario list.
3. Repeatable run command and configuration requirements.
4. CI result or clear local execution proof.
5. Evidence for failures: report, logs, screenshot, trace, or video.
6. A short note on limitations and future improvements.
