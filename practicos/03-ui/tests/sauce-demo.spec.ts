import { test, expect } from "@playwright/test";

test("Login successful", async ({ page }) => {
    await page.goto("/");
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Products')).toBeVisible();
});

test("Add two items to the cart", async ({ page }) => {
    await page.goto("/");
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    const addButtons = page.getByRole("button", { name: "Add to cart" });
    await addButtons.nth(0).click();
    await addButtons.nth(1).click();   
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("2");
});


test("checkout before confirmation", async ({ page }) => {
    await page.goto("/");
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    const addButtons = page.getByRole("button", { name: "Add to cart" });
    await addButtons.nth(0).click();
    await addButtons.nth(1).click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("2");
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill('Fernando');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Paz');
    await page.getByRole('textbox', { name: 'Postal Code' }).fill('4000');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
});

