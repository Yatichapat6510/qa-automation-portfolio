# Performance and Load Testing with JMeter

**Current material:** [`learning/workshops/workshop-1-mixed-exercises/beginner_load_test.jmx`](../learning/workshops/workshop-1-mixed-exercises/beginner_load_test.jmx) and [`learning/workshops/qa-automation-workshop/week05-performance-jmeter`](../learning/workshops/qa-automation-workshop/week05-performance-jmeter/)

## Target showcase layout

```text
performance-jmeter-test-lab/
├── test-plans/            # .jmx files
├── data/                  # input datasets
├── results/               # small anonymised samples only
├── reports/executive-summary.md
└── docs/workload-model.md
```

## Required analysis for a portfolio-quality result

| Item | Example question |
| --- | --- |
| Objective | Can the checkout API handle the expected peak load? |
| Workload model | How many virtual users, ramp-up, duration, and think time? |
| Pass criteria | Is p95 response time below the agreed target and error rate below 1%? |
| Finding | At what concurrency did latency or errors increase? |
| Recommendation | What should engineering investigate next? |

Do not present a `.jmx` file alone. The decision-making context is the valuable QA evidence.
