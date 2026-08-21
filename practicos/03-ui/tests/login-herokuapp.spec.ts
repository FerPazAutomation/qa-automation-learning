import { test, expect } from "@playwright/test";

test("Login successful", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Welcome to the Secure Area.')).toBeVisible();
});

test("Login failed", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByRole('textbox', { name: 'Password' }).fill('WrongPassword!');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Your password is invalid!')).toBeVisible();
});

test("Logout", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.getByText('You logged out of the secure area!')).toBeVisible();
});



