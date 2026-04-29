import { test, expect } from '@playwright/test';
import LogIn_page from '../../page_objects_POM/LogIn_page';
import Dashboard_page from '../../page_objects_POM/Dashboard_page';
import Book_List_Add_page from '../../page_objects_POM/Book_List_Add_page';
import FavouriteBooks_page from '../../page_objects_POM/FavouriteBooks_page';
import BookDetails_page from '../../page_objects_POM/BookDetails_page';
import { time } from 'node:console';


test('CT-FE-010: Go to Details Page and View Book Information', async ({ page }) => {
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

    await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
    await expect(dashboardpage.headerNAME).toHaveText("Admin");

    await page.goto('http://localhost:3000/detalhes.html?id=2');

    await expect(page).toHaveURL('http://localhost:3000/detalhes.html?id=2');
    await expect(bookdetailspage.imageBOOK).toBeVisible();
    await expect(bookdetailspage.headerBOOK_TITLE).toBeVisible();
    await expect(bookdetailspage.headerBOOK_AUTHOR).toBeVisible();
    await expect(bookdetailspage.fieldBOOK_PAGE_COUNT).toBeVisible();
    await expect(bookdetailspage.fieldBOOK_DESCRIPTION).toBeVisible();
    await expect(bookdetailspage.fieldBOOK_DATE_ADDED).toBeVisible();
    
    await expect(bookdetailspage.togglebuttonADD_REMOVE_FAVOURITES).toBeVisible();
    await expect(bookdetailspage.togglebuttonADD_REMOVE_FAVOURITES).toBeEnabled();
    await expect(bookdetailspage.buttonDELETE_BOOK).toBeVisible();
    await expect(bookdetailspage.buttonDELETE_BOOK).toBeEnabled();
    await expect(bookdetailspage.buttonGO_BACK).toBeVisible();
    await expect(bookdetailspage.buttonGO_BACK).toBeEnabled();

});