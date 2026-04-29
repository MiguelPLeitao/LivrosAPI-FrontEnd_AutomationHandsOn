import { test, expect } from '@playwright/test';
import Register_page from '../../page_objects_POM/Register_page';
import LogIn_page from '../../page_objects_POM/LogIn_page';
import Dashboard_page from '../../page_objects_POM/Dashboard_page';
import Book_List_Add_page from '../../page_objects_POM/Book_List_Add_page';


test('CT-FE-007: Add New Book', async ({ page }) => {
    const registerpage = new Register_page(page);
    const loginpage = new LogIn_page(page);
    const dashboardpage = new Dashboard_page(page);
    const booklistaddpage = new Book_List_Add_page(page);


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


    //Adicionar novo livro
    await dashboardpage.buttonMANAGEBOOKS.click();
    await expect(page).toHaveURL('http://localhost:3000/livros.html');
    await page.waitForTimeout(5000);

    const books = await page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]");
    const initial_bookCards = await books.count();

    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Livro adicionado com sucesso!');
        await dialog.accept();
    });

    const book_created = await booklistaddpage.Add_Book();
    await page.waitForTimeout(5000);

    await expect(await booklistaddpage.inputfieldBOOK_NAME.inputValue()).toBe("");
    await expect(await booklistaddpage.inputfieldAUTHOR.inputValue()).toBe("");
    await expect(await booklistaddpage.spinbuttonPAGE_COUNT.inputValue()).toBe("");
    await expect(await booklistaddpage.inputfieldBOOK_DESCRIPTION.inputValue()).toBe("");
    await expect(await booklistaddpage.inputfieldBOOK_IMAGE.inputValue()).toBe("");

    const new_bookCards = await books.count();

    expect(new_bookCards).toBe(initial_bookCards + 1);


    await expect(books.last().locator("h3")).toHaveText(book_created.title);
    await expect(books.last().locator("p:has-text('Autor')")).toContainText(book_created.author);

});
