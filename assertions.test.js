import { test, expect } from '@playwright/test';

test('Check Test', async ({ page }) => {

    await page.goto('/');
    await expect(page).toHaveTitle('Learn Playwright');

    const checkbox = page.getByRole('checkbox');
    const textarea = page.locator('#testarea');
    const message = 'Recommended by a friend';

    await expect(textarea).toBeDisabled();
    await expect(textarea).toBeEmpty();

    await checkbox.check();
    await expect(textarea).toBeEnabled();

    await textarea.fill(message);
    await expect(textarea).toHaveValue(message);

    await page.getByRole('button', { name: 'Register' }).click();

    const feedback = page.locator('.invalid-feedback');
    await expect(feedback).toHaveCount(3);

    for (const message of await feedback.all()){
        await expect(message).toBeVisible();

    }

await expect(feedback.first()).toContainText('Valid first name is required');

});


test('Test with negative matchers', async({ page }) => {

    await page.goto('/');
    await expect(page.getByTestId('location')).toContainText('Switzerland');
    await expect(page.getByTestId('location')).not.toContainText('London');
    
});


test('Test with soft assertions', async({ page }) => {

    await page.goto('/');
    await expect.soft(page.getByTestId('location')).toContainText('Mumbai');
    await expect(page.getByTestId('location')).not.toContainText('Switzerland');

});