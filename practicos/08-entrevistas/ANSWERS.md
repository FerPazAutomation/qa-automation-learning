# Module 08 — Interview answers (EN)

Use these as study notes. Adapt them in your own words during interviews.

---

## 1. Why automation?

I automate because many regression flows are repetitive and high value.
Automation gives fast, repeatable feedback so the team can catch issues early.
I still keep exploratory testing and volatile areas manual.

---

## 2. Page Object Model?

I use Page Object Model to keep locators and page actions in page classes.
The test files stay thin and focus on assertions and business behavior.
This separation makes the suite easier to read and maintain when the UI changes.

---

## 3. API vs UI testing?

API tests check contracts: status codes and key response fields with GET/POST requests.
They are usually faster and more stable.
UI tests validate what the end user sees, like login and checkout.
I use more API checks and only a few critical UI end-to-end flows.

---

## 4. What is CI for QA?

CI runs the automated suite automatically on pull requests and pushes to the main branch.
It acts as a quality gate: if tests fail, we investigate before merging.
In my portfolio, GitHub Actions runs Playwright tests on every PR.

---

## 5. How do you handle flaky tests?

First I investigate whether the failure is a product bug or a test defect.
I prefer stable locators, avoid hard waits, and use Playwright reports and traces.
Auto-waiting helps, but flaky tests still need root-cause analysis.
I only use retries carefully, not to hide real problems.

---

## 6. Example of a bug you found and its impact?

In my automation practice, I worked on a failing login caused by a bad locator.
Using the HTML report and traces, I confirmed it was a test defect, not a product bug.
I fixed the locator and the suite became reliable again.
From manual QA, I also reported defects that blocked user flows before release,
which protected customers and avoided production issues.

---

## Key interview line

> "A failed automated test is evidence. I investigate before I call it a product bug."
