1. A function is a reusable block of code that receives inputs (parameters),
   runs some logic, and can return a result. For example, normalizeEmail
   takes an email and returns a cleaned string.

2. await waits for a Promise to finish. When I await fetch(...), I pause
   until the server responds, then I can read the status or the JSON body.

3. An assertion checks that the actual result matches the expected result.
   If they differ, the test fails. Example: expected status 200, actual 500.
