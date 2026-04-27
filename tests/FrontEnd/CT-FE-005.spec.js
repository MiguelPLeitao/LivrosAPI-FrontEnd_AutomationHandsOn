import { test, expect } from '@playwright/test';

test('CT-FE-005: Page Protection. Unable to access without Log In.', async ({ page }) => {

    await page.goto('http://localhost:3000/registro.html');
    expect(page).toHaveURL('http://localhost:3000/registro.html');

    await page.goto('http://localhost:3000/login.html');
    expect(page).toHaveURL('http://localhost:3000/login.html');

    await page.goto('http://localhost:3000/dashboard.html');
    expect(page).toHaveURL('http://localhost:3000/login.html');

    await page.goto('http://localhost:3000/livros.html');
    expect(page).toHaveURL('http://localhost:3000/login.html');

    await page.goto('http://localhost:3000/favoritos.html');
    expect(page).toHaveURL('http://localhost:3000/login.html');

    await page.goto('http://localhost:3000/detalhes.html?id=1');
    expect(page).toHaveURL('http://localhost:3000/login.html');

    await page.goto('http://localhost:3000/detalhes.html');
    expect(page).toHaveURL('http://localhost:3000/login.html');


});