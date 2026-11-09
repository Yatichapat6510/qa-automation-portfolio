#!/usr/bin/env bash
# รันชุดทดสอบ mobile ทั้งหมดบน emulator ที่เปิดอยู่: pytest -> Robot Framework -> Maestro
# ใช้ใน .github/workflows/mobile.yml (เรียกผ่าน android-emulator-runner) และรันบนเครื่อง Linux/macOS ได้
# การใช้งาน: bash mobile/scripts/run-android-ci.sh <path-ของ-apk>
set -uo pipefail

APK_PATH="${1:?usage: run-android-ci.sh <apk-path>}"
REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
RESULTS="$REPO_ROOT/mobile/results"
ALLURE_RESULTS="$RESULTS/allure-results"
APP_PACKAGE="com.saucelabs.mydemoapp.android"

mkdir -p "$ALLURE_RESULTS" "$RESULTS/robot" "$RESULTS/maestro"
status=0

echo "::group::Install app"
adb install -r "$APK_PATH"
echo "::endgroup::"

# เปิด Appium Server เบื้องหลัง แล้วรอจน endpoint /status ตอบกลับ
appium --log "$RESULTS/appium.log" --log-no-colors &
APPIUM_PID=$!
for _ in $(seq 1 30); do
  curl -sf http://127.0.0.1:4723/status >/dev/null && break
  sleep 2
done

echo "::group::pytest"
(cd "$REPO_ROOT/mobile/appium" && python -m pytest tests/py \
  --alluredir="$ALLURE_RESULTS" \
  --junitxml="$RESULTS/pytest-junit.xml") || status=1
echo "::endgroup::"

echo "::group::Robot Framework"
python -m robot \
  --outputdir "$RESULTS/robot" \
  --listener "allure_robotframework;$ALLURE_RESULTS" \
  "$REPO_ROOT/mobile/appium/tests/robot" || status=1
echo "::endgroup::"

# ปิด Appium และหยุด UiAutomator2 server ก่อนรัน Maestro เพราะทั้งสองใช้ UiAutomation ตัวเดียวกันพร้อมกันไม่ได้
kill "$APPIUM_PID" 2>/dev/null || true
adb shell am force-stop io.appium.uiautomator2.server || true
adb shell am force-stop io.appium.uiautomator2.server.test || true
adb shell am force-stop "$APP_PACKAGE" || true

echo "::group::Maestro"
# ใช้สคริปต์เดียวกับที่รันบนเครื่อง local: ชุดหลัก (smoke + tc_*) มีผลต่อ exit code ส่วน known defect รันแยกและไม่นับเป็น fail
bash "$REPO_ROOT/mobile/maestro/scripts/run_tests.sh" || status=1
# ย้ายผล Maestro (JUnit, screenshot, log) มารวมกับ artifact ของ CI
cp -r "$REPO_ROOT/mobile/maestro/results/." "$RESULTS/maestro/" 2>/dev/null || true
# Allure อ่านไฟล์ JUnit XML ได้ จึงคัดลอกผลชุดหลักของ Maestro เข้าไปรวมในรายงานเดียวกัน
cp "$RESULTS/maestro/report.xml" "$ALLURE_RESULTS/maestro-junit.xml" 2>/dev/null || true
echo "::endgroup::"

exit "$status"
