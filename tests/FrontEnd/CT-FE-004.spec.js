import { test, expect } from '@playwright/test';
import LogIn_page from '../../page_objects_POM/LogIn_page';

test('CT-FE-004: Log In Inválido', async ({ page }) => {
    const loginpage = new LogIn_page(page);

    await page.goto('http://localhost:3000/login.html');

    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Email ou senha incorretos');
        await dialog.accept();
    });

    await loginpage.LogIn("admin@biblioteca.com", "senhaerrada");

    await expect(page).toHaveURL('http://localhost:3000/login.html');
    await expect(loginpage.inputfieldEMAIL).toHaveValue("admin@biblioteca.com");
    await expect(loginpage.inputfieldSENHA).toHaveValue("senhaerrada");

    await loginpage.LogIn("admin@hotmail.pt", "123456");

    await expect(page).toHaveURL('http://localhost:3000/login.html');
    await expect(loginpage.inputfieldEMAIL).toHaveValue("admin@hotmail.pt");
    await expect(loginpage.inputfieldSENHA).toHaveValue("123456");

});