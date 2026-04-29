import { test, expect } from '@playwright/test';

test('CT-FE-005: Page Protection. Unable to access without Log In.', async ({ page }) => {

    await page.goto('http://localhost:3000');

    // Limpar localStorage (force logged-out state)
    await page.evaluate(() => localStorage.clear());

    await page.goto('http://localhost:3000/registro.html');
    await expect(page).toHaveURL('http://localhost:3000/registro.html');

    await page.goto('http://localhost:3000/login.html');
    await expect(page).toHaveURL('http://localhost:3000/login.html');

    await page.goto('http://localhost:3000/dashboard.html');
    await expect(page).toHaveURL('http://localhost:3000/login.html');

    await page.goto('http://localhost:3000/livros.html');
    await expect(page).toHaveURL('http://localhost:3000/login.html');

    await page.goto('http://localhost:3000/favoritos.html');
    await expect(page).toHaveURL('http://localhost:3000/login.html');

    await page.goto('http://localhost:3000/detalhes.html?id=1');
    await expect(page).toHaveURL('http://localhost:3000/login.html');

    await page.goto('http://localhost:3000/detalhes.html');
    await expect(page).toHaveURL('http://localhost:3000/login.html');

});