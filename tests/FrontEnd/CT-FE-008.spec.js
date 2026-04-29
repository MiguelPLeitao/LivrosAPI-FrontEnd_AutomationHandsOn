import { test, expect } from '@playwright/test';
import Register_page from '../../page_objects_POM/Register_page';
import LogIn_page from '../../page_objects_POM/LogIn_page';
import Dashboard_page from '../../page_objects_POM/Dashboard_page';
import Book_List_Add_page from '../../page_objects_POM/Book_List_Add_page';


test('CT-FE-008: Error Adding Book', async ({ page }) => {
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


    //Adicionar novo livro tentaiva 1
    await dashboardpage.buttonMANAGEBOOKS.click();
    await expect(page).toHaveURL('http://localhost:3000/livros.html');
    await page.waitForTimeout(5000);

    const books = await page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]");
    const initial_bookCards = await books.count();

    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Livro adicionado com sucesso!');
        await dialog.accept();
    });

    await booklistaddpage.Add_Book_Wrong("", "", "");

    await expect(await booklistaddpage.inputfieldBOOK_NAME.inputValue()).toBe("");
    await expect(await booklistaddpage.inputfieldAUTHOR.inputValue()).toBe("");
    await expect(await booklistaddpage.spinbuttonPAGE_COUNT.inputValue()).toBe("");

    const validationMessage = await booklistaddpage.inputfieldBOOK_NAME.evaluate((element) => element.validationMessage);

    expect(validationMessage).toContain('Please fill out this field.');

    const new_bookCards_tentativa1 = await books.count();
    expect(new_bookCards_tentativa1).toBe(initial_bookCards);


    //Adicionar novo livro tentaiva 2
    await booklistaddpage.Add_Book_Wrong("ABCD1234", "", "");

    await expect(await booklistaddpage.inputfieldBOOK_NAME.inputValue()).toBe("ABCD1234");
    await expect(await booklistaddpage.inputfieldAUTHOR.inputValue()).toBe("");
    await expect(await booklistaddpage.spinbuttonPAGE_COUNT.inputValue()).toBe("");

    const validationMessage1 = await booklistaddpage.inputfieldAUTHOR.evaluate((element) => element.validationMessage);

    expect(validationMessage1).toContain('Please fill out this field.');

    const new_bookCards_tentativa2 = await books.count();
    expect(new_bookCards_tentativa2).toBe(initial_bookCards);


    //Adicionar novo livro tentaiva 3
    await booklistaddpage.Add_Book_Wrong("ABCD1234", "Autor Teste Erro 3", "");

    await expect(await booklistaddpage.inputfieldBOOK_NAME.inputValue()).toBe("ABCD1234");
    await expect(await booklistaddpage.inputfieldAUTHOR.inputValue()).toBe("Autor Teste Erro 3");
    await expect(await booklistaddpage.spinbuttonPAGE_COUNT.inputValue()).toBe("");

    const validationMessage2 = await booklistaddpage.spinbuttonPAGE_COUNT.evaluate((element) => element.validationMessage);

    expect(validationMessage2).toContain('Please fill out this field.');

    const new_bookCards_tentativa3 = await books.count();
    expect(new_bookCards_tentativa3).toBe(initial_bookCards);

});