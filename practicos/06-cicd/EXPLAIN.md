# Module 06 — CI/CD flow (English)

When I open or update a pull request, GitHub Actions runs my Playwright smoke workflow automatically.

The pipeline checks out the code on an Ubuntu runner, installs Node.js dependencies with `npm ci`,
installs Playwright browsers, and runs `npx playwright test` inside `practicos/05-estabilidad`.

If tests fail, the PR check turns red and the HTML report is uploaded as an artifact.
If tests pass, the check is green and the change can be merged.

I verified this by breaking a locator on purpose (CI failed), then fixing it (CI passed again).
This is a quality gate: automated tests protect `master` from broken changes.

**EN one-liner for interviews:**  
*"I configured GitHub Actions to run smoke tests on every pull request and block merge when they fail."*
