import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { users } from "../data/users";

test("Checkout before confirmation", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login(users.valid.username, users.valid.password);
    await inventoryPage.addToCart(0);
    await inventoryPage.addToCart(1);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("2");
    await inventoryPage.openCart();
    await inventoryPage.continueToCheckout();
    await expect(page.getByText("Checkout: Your Information")).toBeVisible();
    await inventoryPage.fillCheckoutForm("Fernando", "Paz", "4000");
    await inventoryPage.finishPurchase();
    await expect(page.getByText("Thank you for your order!")).toBeVisible();
});