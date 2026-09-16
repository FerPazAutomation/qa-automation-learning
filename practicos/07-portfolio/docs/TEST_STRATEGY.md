# Test Strategy

## Scope

### What we automate
- UI smoke: Sauce Demo login + checkout (happy path)
- UI negative: invalid login cases (data-driven)
- API contract: JSONPlaceholder GET/POST (status codes + key response fields)

### What we do NOT automate
- Exploratory testing
- Visual / pixel-perfect UI checks
- Full regression for every Sauce Demo user
- Captcha or third-party payment flows (not part of this demo app)

## Approach
- Test pyramid: more API checks, few critical UI E2E flows
- UI uses Page Object Model; invalid login uses data-driven cases
- Specs stay thin: pages hold actions; tests hold assertions

## Environments
- Local: `npx playwright test` — see [HOW_TO_RUN.md](./HOW_TO_RUN.md)
- CI: GitHub Actions runs the complete portfolio suite on pull requests and pushes to `master`
- Workflow: [Portfolio Playwright Tests](https://github.com/FerPazAutomation/qa-automation-learning/actions/workflows/playwright-portfolio.yml)

## Reporting
- HTML report
- Screenshot and trace on failure (configured in Playwright)
