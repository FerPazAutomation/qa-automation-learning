import { test, expect } from "@playwright/test";

    test("Add 3 items to the todo list", async ({ page }) => {
        await page.goto("/todomvc/#/");
        await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Gym Day');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Running trainning');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Make a breakfast');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');    
        await expect(page.getByText('Gym Day')).toBeVisible();
        await expect(page.getByText('Running trainning')).toBeVisible();
        await expect(page.getByText('Make a breakfast')).toBeVisible();
    });

    test("Complete the first item", async ({ page }) => {
        await page.goto("/todomvc/#/");
        await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Gym Day');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter')
        const todo = page.getByTestId('todo-item').filter({ hasText: 'Gym Day' });
        await todo.getByRole('checkbox').click();
        await expect(todo).toHaveClass('completed');
    });

    test("filter by active or completed", async ({ page }) => {
        await page.goto("/todomvc/#/");
        await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Gym Day');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter')
        await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Running trainning');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter')
        const todo = page.getByTestId('todo-item').filter({ hasText: 'Gym Day' });
        await todo.getByRole('checkbox').click();
        await page.getByRole('link', { name: 'Active' }).click();
        await expect(page.getByText('Running trainning')).toBeVisible();
        await page.getByRole('link', { name: 'Completed' }).click();
        await expect(page.getByText('Gym Day')).toBeVisible();
    });

    test("Delete 1 item from the todo list", async ({ page }) => {
        await page.goto("/todomvc/#/");
        await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Gym Day');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Running trainning');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Make a breakfast');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
        const todo = page.getByTestId('todo-item').filter({ hasText: 'Gym Day' });
        await todo.hover();
        await todo.getByRole('button', { name: 'Delete' }).click();
        await expect(todo).toHaveCount(0);

    });