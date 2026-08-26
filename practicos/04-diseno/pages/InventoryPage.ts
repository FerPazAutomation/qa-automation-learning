import { type Page } from "@playwright/test";

export class InventoryPage {
    constructor(private readonly page: Page) {}
   
    async addToCart(index: number) {
        const addButtons = this.page.getByRole("button", { name: "Add to cart" });
        await addButtons.nth(index).click();
    }

    async removeFromCart(index: number) {
        const removeButtons = this.page.getByRole("button", { name: "Remove" });
        await removeButtons.nth(index).click();
    }

    async openCart () {
        const cartLink = this.page.locator('[data-test="shopping-cart-link"]');
        await cartLink.click();
    }
    async continueToCheckout() {
        await this.page.getByRole('button', { name: 'Checkout' }).click();
    }
    async fillCheckoutForm( firstName: string, lastName: string, postalCode: string) {
        await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
        await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
        await this.page.getByRole('textbox', { name: 'Postal Code' }).fill(postalCode);
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }
    async finishPurchase() {
        await this.page.getByRole('button', { name: 'Finish' }).click();
    }
}   