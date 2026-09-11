import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  reporter: [["html"], ["list"]],
  retries: process.env.CI ? 1 : 0,  
  use: {
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "api-jsonplaceholder",
      use: { baseURL: "https://jsonplaceholder.typicode.com" },
      testMatch: /api\/todos\.spec\.ts/,
    },
    {
      name: "ui-saucedemo",
      use: { baseURL: "https://www.saucedemo.com" },
      testMatch: /ui\/.*\.spec\.ts/,
    },
  ],
});