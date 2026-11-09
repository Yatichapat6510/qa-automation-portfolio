#!/usr/bin/env bash
# รันชุดเทสต์ Maestro แล้วสร้างรายงาน JUnit + artifact (screenshot, log) ไว้ใน results/
# ใช้ทั้งบนเครื่อง local และใน CI (GitHub Actions ต้องเรียกผ่านสคริปต์นี้ เพราะ android-emulator-runner
# รันแต่ละบรรทัดแยก shell กัน จึงเก็บตัวแปรสถานะข้ามบรรทัดไม่ได้)
#
# การใช้งาน: scripts/run_tests.sh [tags]
#   tags    tag ที่ต้องการรัน คั่นด้วย , (ไม่ระบุ = รันทั้งชุดหลัก) เช่น smoke หรือ login,cart
#
# Exit code: 0 = ชุดหลักผ่านทั้งหมด, 1 = มีเคสในชุดหลักล้ม
# เคส known defect รันแยกและไม่มีผลต่อ exit code (คาดว่าจะล้มจนกว่าบั๊กจะถูกแก้)
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TAGS="${1:-}"
RESULTS="$ROOT/results"
mkdir -p "$RESULTS"

tag_args=()
[[ -n "$TAGS" ]] && tag_args=(--include-tags="$TAGS")

echo "== ชุดหลัก (tags: ${TAGS:-ทั้งหมด}) =="
maestro test "$ROOT/flows" "${tag_args[@]}" \
  --format junit --output "$RESULTS/report.xml" \
  --test-output-dir "$RESULTS/main"
main_status=$?

# เคส known defect รันเฉพาะตอนไม่กรองด้วย tag เพื่อให้รันตามที่ผู้ใช้ขอเป๊ะๆ
if [[ -z "$TAGS" ]]; then
  echo "== Known defects (ไม่นับเป็น fail) =="
  maestro test "$ROOT/flows/known_defects" \
    --format junit --output "$RESULTS/report-known-defects.xml" \
    --test-output-dir "$RESULTS/known_defects" \
    || echo "known defect ยังล้มตามที่คาดไว้ (BUG-004)"
fi

exit "$main_status"
