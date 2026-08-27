import { expect, type Page } from "@playwright/test";

export async function expectErrorMessage(page: Page, text: string | RegExp) {
    await expect(page.getByText(text)).toBeVisible();
}