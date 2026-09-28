# คู่มือ Commit (ยังไม่ได้ commit/push ให้ตามที่สั่ง)

รันคำสั่งใน PowerShell ที่โฟลเดอร์ `Git Hub qa-automation-portfolio`

## ก่อน commit: ตรวจสอบ 3 อย่าง

```powershell
git status
git diff --stat
```

- ควรเห็นไฟล์ที่ขึ้น `M` เหลือประมาณ 16 ไฟล์ (เดิม 109 ไฟล์ที่เป็นแค่ปัญหา line ending CRLF/LF จะหายไปหลังเพิ่ม `.gitattributes`)
- แก้ TODO ช่องทางติดต่อใน `README.md` (ค้นหาคำว่า `TODO`)
- ทดลองรันในเครื่อง (ผมรันเทสต์ให้ไม่ได้ เพราะ node_modules ในเครื่องเป็นของ Windows):
  `cd web/playwright; npm run test:list` และ `npm test`

## แนะนำ: แบ่งเป็น 2 commits

### Commit 1: ตั้งค่า line ending และ ignore (ทำก่อน)

```powershell
git add .gitattributes .gitignore
git commit -m "chore: normalise line endings and ignore generated reports

Add .gitattributes (eol=lf) so Windows CRLF stops showing every file as
modified. Extend .gitignore for ortoni-report, npm/pytest caches, venvs,
editor and agent folders."
```

### Commit 2: จัดโครงสร้างใหม่ + CI + เอกสาร

```powershell
git add -A
git status          # ตรวจว่า Playwright/ortoni-report ถูกลบออกจาก Git, และไฟล์ย้ายขึ้นเป็น R (rename)
git commit -m "refactor: group projects by capability, fix CI and rewrite portfolio docs

Structure
- Move Playwright, cypress, Robot-Framework to web/; api-automation to
  api/postman-newman; Appium and Maestro to mobile/; Workshops to
  learning/workshops. Internal layouts unchanged so imports still resolve.
- Rename files/folders to kebab-case English (no spaces, Thai or emoji):
  Cypress specs and fixture, Playwright practice specs, Robot tests,
  Postman collections/environments, workshop folders.
- Move Playwright internal reports to docs/internal.
- Remove regenerable files: root results/, .npm-cache, .pytest_cache and
  empty folders.

CI
- Consolidate all workflows in .github/workflows (nested ones never ran).
- Fix Robot workflow path (05_Robot-Framework -> web/robot-framework).
- Add newman.yml (secret check moved to step level) and cypress.yml.
- Add paths filters and working-directory per project.
- Untrack Playwright/ortoni-report generated output.

API
- Fix npm scripts and environments to match renamed Postman files;
  set baseUrl in the public environment.

Docs
- Rewrite root README (+ Thai README), PORTFOLIO_STRUCTURE, roadmap,
  content inventory and project showcase pages with correct paths.
- Add READMEs for Appium, Maestro, learning lab; expand Playwright README.
- Add Playwright and Cypress test strategies and three example bug reports.
- Replace sample text in Ortoni reporter config."
```

## หมายเหตุหลัง push

1. เข้า GitHub → Actions ตรวจว่า 4 workflow (Playwright, Cypress, Robot, Newman) เป็นสีเขียว
2. workflow `newman.yml` ทำงานเมื่อ push ไป branch `main` (แก้ถ้า branch ชื่ออื่น)
3. Badge ใน README จะขึ้นหลังมีการรัน workflow ครั้งแรก
4. ตั้ง repository description, topics (`qa`, `test-automation`, `playwright`, `cypress`, `robot-framework`, `postman`, `appium`) และ pin repo ที่โปรไฟล์
5. ไฟล์ที่ผมไม่ได้แตะ: `web/robot-framework/.vscode/.github/workflows/robot-tests.yml` (เก่า ไม่ทำงาน และถูก ignore อยู่แล้ว) ลบเองได้ถ้าไม่ต้องการ
6. ถ้ามี clone อื่นหรือ path ในเครื่อง (เช่น VS Code workspace, task ที่อ้าง `Playwright/`) ต้องอัปเดตเป็น `web/playwright/`
