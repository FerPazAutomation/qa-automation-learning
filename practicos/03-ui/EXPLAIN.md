## Exercise E — Explain in English

Auto-waiting reduces flakiness because Playwright waits until an element is ready
(visible, enabled, stable) before clicking or filling. I do not need fixed sleeps
like waitForTimeout(5000), which are slow and unreliable.

I prefer getByRole over brittle CSS selectors because roles match how users and
accessibility tools see the page (button, textbox, link). When the layout CSS
changes, role-based locators often still work. For changing UI state (like a cart
badge count), I keep a stable locator for the control and assert the value separately.
