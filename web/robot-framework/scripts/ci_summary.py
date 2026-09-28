"""Summarise a Robot Framework output.xml for GitHub Actions.

Writes a Markdown table to stdout (append it to $GITHUB_STEP_SUMMARY) and emits
`::error` workflow commands so the first failures show up as run annotations.

Usage: python scripts/ci_summary.py results/output.xml
"""
import sys

from robot.api import ExecutionResult, ResultVisitor


class Collector(ResultVisitor):
    def __init__(self):
        self.failed = []

    def visit_test(self, test):
        if test.status == "FAIL":
            self.failed.append((test.longname, (test.message or "").strip()))


def one_line(text, limit=400):
    text = " ".join(text.split())
    return text if len(text) <= limit else text[: limit - 3] + "..."


def main(path):
    result = ExecutionResult(path)
    stats = result.statistics.total
    collector = Collector()
    result.visit(collector)

    print("## Robot Framework results\n")
    print(f"Passed: **{stats.passed}** | Failed: **{stats.failed}** | Skipped: **{stats.skipped}**\n")
    if collector.failed:
        print("| Failed test | Message |")
        print("| --- | --- |")
        for name, message in collector.failed:
            print(f"| `{name}` | {one_line(message).replace('|', '/')} |")
        for name, message in collector.failed[:10]:
            text = one_line(f"{name}: {message}", 900).replace("%", "%25").replace("\r", "").replace("\n", "%0A")
            print(f"::error title=Robot test failed::{text}", file=sys.stderr)
            sys.stderr.flush()


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "results/output.xml")
