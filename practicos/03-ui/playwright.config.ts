import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./tests",
    projects: [
        {
            name: "the-internet-herokuapp",
            use: { baseURL: "https://the-internet.herokuapp.com" },
            testMatch: /login-herokuapp\.spec\.ts/,
          },
          {
            name: "todomvc-e2e",
            use: { baseURL: "https://demo.playwright.dev" },
            testMatch: /demo-todomvc\.spec\.ts/,
          },
          {
            name: "saucedemo-e2e",
            use: { baseURL: "https://www.saucedemo.com" },
            testMatch: /sauce-demo\.spec\.ts/,
          },
    ],
});