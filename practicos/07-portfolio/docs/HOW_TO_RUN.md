# How to run

## Prerequisites
- Node.js LTS
- npm

## Install
```bash
cd practicos/07-portfolio
npm ci
npx playwright install
```

## Run all tests
```bash
npx playwright test
```

## Run by project
```bash
npx playwright test --project=api-jsonplaceholder
npx playwright test --project=ui-saucedemo
```

## Report
```bash
npx playwright show-report
```

## Notes
- `npm ci` installs from `package-lock.json` (preferred for CI and clean local runs).
- First-time project creation (`npm init`, `npm install -D @playwright/test`) was already done; you do not need those steps to run this portfolio.
