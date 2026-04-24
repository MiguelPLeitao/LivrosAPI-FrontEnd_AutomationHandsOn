// @ts-check
import { test, expect } from '@playwright/test';
import LogIn_page from '../../page_objects_POM/LogIn_page';
import Dashboard_page from '../../page_objects_POM/Dashboard_page';


test('CT-FE-003: Log In com Sucesso', async ({ page }) => {
    const loginpage = new LogIn_page(page);
    const dashboardpage = new Dashboard_page(page);

    await page.goto('http://localhost:3000/login.html');

    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Login realizado com sucesso!');
        await dialog.accept();
    });

    await loginpage.LogIn("admin@biblioteca.com", "123456");

    await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
    await expect(dashboardpage.headerNAME).toHaveText("Admin");

});