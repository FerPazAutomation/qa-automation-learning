// playwright.config.ts — ejemplo Sauce Demo
import { defineConfig } from "@playwright/test";

// Activá HTML report + trace on first retry + screenshot on failure
export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "https://www.saucedemo.com",
    screenshot: "only-on-failure",
    trace: "on-first-retry",  // Activá trace on first retry  
    video: "on-first-retry",
  },
  testMatch: /login\.spec\.ts/, // Activá solo el test login.spec.ts
  reporter: [['html'], ['list']],
  retries: 1
});