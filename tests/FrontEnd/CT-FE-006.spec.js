import { test, expect } from '@playwright/test';
import Register_page from '../../page_objects_POM/Register_page';
import LogIn_page from '../../page_objects_POM/LogIn_page';
import Dashboard_page from '../../page_objects_POM/Dashboard_page';


test('CT-FE-006: Access and View Dashboard and Statistics', async ({ page }) => {
    const registerpage = new Register_page(page);
    const loginpage = new LogIn_page(page);
    const dashboardpage = new Dashboard_page(page);

    // Acesso a página inicial para garantir que estamos em um estado limpo
    await page.goto('http://localhost:3000');

    // Limpar localStorage (force logged-out state)
    await page.evaluate(() => localStorage.clear());

    // Registar um novo user
    await page.goto('http://localhost:3000/registro.html');

    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Conta criada com sucesso!');
        await dialog.accept();
    });

    const user = await registerpage.Register();


    await expect(page).toHaveURL('http://localhost:3000/login.html');

    //Fazer Log In com o user criado e Acesso Dashboard
    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Login realizado com sucesso!');
        await dialog.accept();
    });

    await loginpage.LogIn(user.email, user.password);

    await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
    await expect(dashboardpage.headerNAME).toHaveText(user.name);

    // Verificar Estatísticas estão visíveis
    await expect(dashboardpage.fieldTOTALBOOKS).toBeVisible();
    await expect(dashboardpage.fieldTOTALPAGES).toBeVisible();
    await expect(dashboardpage.fieldNUMBERUSERS).toBeVisible();

    //formato das estatísticas está correto (números)
    const totalBooks = Number(await dashboardpage.fieldTOTALBOOKS.textContent());
    const totalPages = Number(await dashboardpage.fieldTOTALPAGES.textContent());
    const totalUsers = Number(await dashboardpage.fieldNUMBERUSERS.textContent());

    expect(Number.isInteger(totalBooks)).toBe(true);
    expect(Number.isInteger(totalPages)).toBe(true);
    expect(Number.isInteger(totalUsers)).toBe(true);

    // Grelha de últimos 5 livros está visível
    await expect(dashboardpage.buttonBOOK1).toBeVisible();
    await expect(dashboardpage.buttonBOOK2).toBeVisible();
    await expect(dashboardpage.buttonBOOK3).toBeVisible();
    await expect(dashboardpage.buttonBOOK4).toBeVisible();
    await expect(dashboardpage.buttonBOOK5).toBeVisible();

    // Grelha mostra um máximo de 5 livros
    const bookCards = await page.locator("//div[@id='livros-recentes']//div[contains(@class,'book-card')]").count();
    expect(bookCards).toBeLessThanOrEqual(5);

    // Na Grelha cada Livro contém nome, autor e imagem
    for (let i = 0; i < bookCards; i++) {
        const bookCard = page.locator("//div[@id='livros-recentes']//div[contains(@class,'book-card')]").nth(i);
        await expect(bookCard.locator("h3")).toBeVisible();
        await expect(bookCard.locator("p:has-text('Autor')")).toBeVisible();
        await expect(bookCard.locator("img")).toBeVisible();
    }

});