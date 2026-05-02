import { test, expect } from '@playwright/test';
import LogIn_page from '../../page_objects_POM/LogIn_page';
import Dashboard_page from '../../page_objects_POM/Dashboard_page';
import Book_List_Add_page from '../../page_objects_POM/Book_List_Add_page';
import FavouriteBooks_page from '../../page_objects_POM/FavouriteBooks_page';
import BookDetails_page from '../../page_objects_POM/BookDetails_page';
import { time } from 'node:console';
import { th } from '@faker-js/faker';


test('CT-FE-011-012-013: Check empty Favourites Page, Add book to Favourites and Remove book from Favourites', async ({ page }) => {
    const loginpage = new LogIn_page(page);
    const dashboardpage = new Dashboard_page(page);
    const booklistaddpage = new Book_List_Add_page(page);
    const favouritebookspage = new FavouriteBooks_page(page);
    const bookdetailspage = new BookDetails_page(page);

    await page.goto('http://localhost:3000/login.html');

    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Login realizado com sucesso!');
        await dialog.accept();
    });

    await loginpage.LogIn("admin@biblioteca.com", "123456");

    //Check empty Favourites Page
    await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
    await expect(dashboardpage.headerNAME).toHaveText("Admin");

    await dashboardpage.Go_MyFavourites_Page();
    await expect(page).toHaveURL('http://localhost:3000/favoritos.html');
    await expect(favouritebookspage.textNO_BOOKS).toBeVisible();
    await expect(favouritebookspage.textNO_BOOKS).toHaveText('Você ainda não tem livros favoritos.');

    //Add book to Favourites
    await page.goto('http://localhost:3000/detalhes.html?id=1');

    await expect(page).toHaveURL('http://localhost:3000/detalhes.html?id=1');
    await page.waitForTimeout(5000);

    await expect(bookdetailspage.togglebuttonADD_REMOVE_FAVOURITES).toBeVisible();
    await expect(bookdetailspage.togglebuttonADD_REMOVE_FAVOURITES).toBeEnabled();
    await expect(bookdetailspage.buttonDELETE_BOOK).toBeVisible();
    await expect(bookdetailspage.buttonDELETE_BOOK).toBeEnabled();
    await expect(bookdetailspage.buttonGO_BACK).toBeVisible();
    await expect(bookdetailspage.buttonGO_BACK).toBeEnabled();

    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Adicionado aos favoritos!');
        await dialog.accept();
    });

    await bookdetailspage.Click_ADD_REMOVE_FAVOURITES();
    if (await expect(bookdetailspage.togglebuttonADD_REMOVE_FAVOURITES).toHaveText('❤️ Remover dos Favoritos')) {
        await expect(bookdetailspage.togglebuttonADD_REMOVE_FAVOURITES).toHaveCSS('background-color', 'rgb(102, 126, 234)')
    };

    //Check book in Favourites Page and Remove book from Favourites
    await page.goto('http://localhost:3000/favoritos.html');
    await expect(page).toHaveURL('http://localhost:3000/favoritos.html');
    await page.waitForTimeout(5000);

    await expect(favouritebookspage.buttonBOOK1).toBeVisible();
    await expect(favouritebookspage.buttonBOOK1).toBeEnabled();
    await favouritebookspage.Click_Book1();

    await expect(page).toHaveURL('http://localhost:3000/detalhes.html?id=1');
    await page.waitForTimeout(5000);

    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Removido dos favoritos!');
        await dialog.accept();
    });

    await bookdetailspage.Click_ADD_REMOVE_FAVOURITES();
    if (await expect(bookdetailspage.togglebuttonADD_REMOVE_FAVOURITES).toHaveText('🤍 Adicionar aos Favoritos')) {
        await expect(bookdetailspage.togglebuttonADD_REMOVE_FAVOURITES).toHaveCSS('background-color', 'rgb(102, 126, 234)')
    };


});