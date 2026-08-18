PRACTICA D

1. An endpoint is a URL + HTTP method that exposes a resource, e.g. GET /todos/1.
2. 401 means you are not authenticated. 404 means the resource does not exist.
   In this module, GET /todos/999999 returned 404.
3. API tests skip the browser, so they are faster and less flaky than UI tests.
   I still use UI tests for critical user flows.