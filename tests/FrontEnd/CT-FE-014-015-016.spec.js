import { test, expect } from '@playwright/test';
import Register_page from '../../page_objects_POM/Register_page';
import LogIn_page from '../../page_objects_POM/LogIn_page';
import Dashboard_page from '../../page_objects_POM/Dashboard_page';
import Book_List_Add_page from '../../page_objects_POM/Book_List_Add_page';
import BookDetails_page from '../../page_objects_POM/BookDetails_page';


test('CT-FE-0014-015-016: Create User, Add new Book, Delete new Book, Logout User', async ({ page }) => {
    const registerpage = new Register_page(page);
    const loginpage = new LogIn_page(page);
    const dashboardpage = new Dashboard_page(page);
    const booklistaddpage = new Book_List_Add_page(page);
    const bookdetailspage = new BookDetails_page(page);


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

    const user5 = await registerpage.Register();


    await expect(page).toHaveURL('http://localhost:3000/login.html');

    //Fazer Log In com o user criado e Acesso Dashboard
    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Login realizado com sucesso!');
        await dialog.accept();
    });

    await loginpage.LogIn(user5.email, user5.password);

    await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
    await expect(dashboardpage.headerNAME).toHaveText(user5.name);


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

    await page.goto('http://localhost:3000/detalhes.html?id=' + book_created.id);
    await expect(page).toHaveURL('http://localhost:3000/detalhes.html?id=' + book_created.id);

    // Delete new Book
    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Tem certeza que deseja deletar este livro?');
        await dialog.accept();
    });

    await bookdetailspage.Click_DELETE_BOOK();

    // Check book is deleted
    await page.goto('http://localhost:3000/detalhes.html?id=' + book_created.id);
    await expect(page).toHaveURL('http://localhost:3000/detalhes.html?id=undefined');
    await expect(bookdetailspage.headerBOOK_TITLE).toHaveText('undefined');
    await expect(bookdetailspage.headerBOOK_AUTHOR).toHaveText('Autor: undefined');


    // Logout User
    await bookdetailspage.LogOut();
    await expect(page).toHaveURL('http://localhost:3000/login.html');

});