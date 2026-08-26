import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { users } from "../data/users";

test("Login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.valid.username, users.valid.password);
    await expect(page.getByText("Products")).toBeVisible();
});

for (const user of users.invalid) {
    test(`Login with invalid credentials: ${user.username}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(user.username, user.password);
        await expect(page.getByText(/Epic sadface/i)).toBeVisible();
    });
}