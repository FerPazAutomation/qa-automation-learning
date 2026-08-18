import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  projects: [
    {
      name: "jsonplaceholder",
      use: {
        baseURL: "https://jsonplaceholder.typicode.com",
      },
      testMatch: /todos\.spec\.ts/,
    },
    {
      name: "restful-booker",
      use: {
        baseURL: "https://restful-booker.herokuapp.com",
      },
      testMatch: /booking\.spec\.ts/,
    },
  ],
});