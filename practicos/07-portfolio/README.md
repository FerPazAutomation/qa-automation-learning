# Playwright QA Portfolio

## About
I started as a Manual QA and built this project to move into QA Automation
with Playwright and TypeScript. The goal is a small, real-world portfolio:
API checks, critical UI smoke tests, Page Object Model, and CI readiness.

I used AI-assisted tooling as a learning aid while owning the design, tests, and decisions.

## Tech stack
- Playwright
- TypeScript
- Page Object Model (POM)
- Data-driven test data
- GitHub Actions (CI — next step)

## What's covered
- **API:** JSONPlaceholder — GET/POST contract checks (status + key fields)
- **UI:** Sauce Demo — login (valid + invalid) and checkout smoke flow
- **Design:** thin specs (assertions in tests; actions in page objects)

## How to run
See [docs/HOW_TO_RUN.md](./docs/HOW_TO_RUN.md) for install and commands.

## Test strategy
See [docs/TEST_STRATEGY.md](./docs/TEST_STRATEGY.md) for scope, pyramid, and reporting.

## CI
GitHub Actions workflow for this portfolio will run the smoke suite on pull requests.
(Badge/link will be added after the workflow is configured.)

## Author
Fernando Paz  
LinkedIn: https://www.linkedin.com/in/fernandollanespaz/  
GitHub: https://github.com/FerPazAutomation/qa-automation-learning
