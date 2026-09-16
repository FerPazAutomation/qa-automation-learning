# Playwright QA Portfolio

[![Portfolio Playwright Tests](https://github.com/FerPazAutomation/qa-automation-learning/actions/workflows/playwright-portfolio.yml/badge.svg)](https://github.com/FerPazAutomation/qa-automation-learning/actions/workflows/playwright-portfolio.yml)

## About
I started as a Manual QA and built this project to move into QA Automation
with Playwright and TypeScript. The goal is a small, real-world portfolio:
API checks, critical UI smoke tests, Page Object Model, and continuous integration.

I used AI-assisted tooling as a learning aid while owning the design, tests, and decisions.

## Tech stack
- Playwright
- TypeScript
- Page Object Model (POM)
- Data-driven test data
- GitHub Actions (CI)

## What's covered
- **API:** JSONPlaceholder — GET/POST contract checks (status + key fields)
- **UI:** Sauce Demo — login (valid + invalid) and checkout smoke flow
- **Design:** thin specs (assertions in tests; actions in page objects)

## How to run
See [docs/HOW_TO_RUN.md](./docs/HOW_TO_RUN.md) for install and commands.

## Test strategy
See [docs/TEST_STRATEGY.md](./docs/TEST_STRATEGY.md) for scope, pyramid, and reporting.

## CI
GitHub Actions runs the complete portfolio suite on pull requests and pushes to `master`.
See the [Portfolio Playwright Tests workflow](https://github.com/FerPazAutomation/qa-automation-learning/actions/workflows/playwright-portfolio.yml)
and the successful [Module 07 CI run](https://github.com/FerPazAutomation/qa-automation-learning/actions/runs/34632660971).

## Author
Fernando Paz

- [LinkedIn](https://www.linkedin.com/in/fernandollanespaz/)
- [GitHub repository](https://github.com/FerPazAutomation/qa-automation-learning)
