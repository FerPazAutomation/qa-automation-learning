In the Page Object I keep selectors and user actions (goto, login, addToCart).
In the test I keep the business flow and assertions (what should happen when I run my tests).
This split improves maintainability: if the UI selector changes, I update one page
file instead of many tests.