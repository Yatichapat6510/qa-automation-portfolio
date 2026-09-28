# Workshops: Learning Lab Guide

`learning/workshops/` preserves multi-tool course and workshop material. It is valuable evidence of breadth, but it is not presented as a single production-ready test framework.

## Content map

| Source | Portfolio capability |
| --- | --- |
| `qa-automation-workshop/week02-api-testing/` | Postman and Python API testing |
| `qa-automation-workshop/week03-ui-playwright/` | Playwright learning suite |
| `qa-automation-workshop/week04-robot-framework/` | Robot API test example |
| `qa-automation-workshop/week05-performance-jmeter/` | JMeter learning guide |
| `qa-automation-workshop/week06-mobile-appium/` | Appium foundation (see also [`mobile/appium`](../../../mobile/appium/)) |
| `workshop-1-mixed-exercises/beginner_exercises.sql` | SQL learning exercises |
| `workshop-1-mixed-exercises/beginner_load_test.jmx` | JMeter test-plan exercise |
| `workshop-1-mixed-exercises/beginner_postman_collection.json` | Postman learning collection |

## Promotion workflow

1. Copy or extract only a verified scenario into a dedicated showcase project.
2. Add a project README, risk-based test strategy, safe environment configuration, and a repeatable command.
3. Keep the original workshop source unchanged as learning history.

This separation keeps the portfolio honest and easy for a hiring manager to navigate.

`workshop-2-saucedemo/` holds the same Sauce Demo scenario in Playwright (JavaScript) and pytest (Python) with page objects, useful for comparing approaches.
