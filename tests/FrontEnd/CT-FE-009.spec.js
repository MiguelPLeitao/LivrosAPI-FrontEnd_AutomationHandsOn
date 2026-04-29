import { test, expect } from '@playwright/test';
import LogIn_page from '../../page_objects_POM/LogIn_page';
import Dashboard_page from '../../page_objects_POM/Dashboard_page';
import Book_List_Add_page from '../../page_objects_POM/Book_List_Add_page';
import FavouriteBooks_page from '../../page_objects_POM/FavouriteBooks_page';


test('CT-FE-009: Page Navigation', async ({ page }) => {
    const loginpage = new LogIn_page(page);
    const dashboardpage = new Dashboard_page(page);
    const booklistaddpage = new Book_List_Add_page(page);
    const favouritebookspage = new FavouriteBooks_page(page);

    await page.goto('http://localhost:3000/login.html');

    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Login realizado com sucesso!');
        await dialog.accept();
    });

    await loginpage.LogIn("admin@biblioteca.com", "123456");

    await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
    await expect(dashboardpage.headerNAME).toHaveText("Admin");

    await dashboardpage.Go_ManageBooks_Page();
    await expect(page).toHaveURL('http://localhost:3000/livros.html');

    await booklistaddpage.Go_Dashboard_Page();
    await expect(page).toHaveURL('http://localhost:3000/dashboard.html');

    await dashboardpage.Go_MyFavourites_Page();
    await expect(page).toHaveURL('http://localhost:3000/favoritos.html');

    await favouritebookspage.Go_Dashboard_Page();
    await expect(page).toHaveURL('http://localhost:3000/dashboard.html');

    await dashboardpage.Go_ManageBooks_Page();
    await expect(page).toHaveURL('http://localhost:3000/livros.html');

    await booklistaddpage.Go_MyFavourites_Page();
    await expect(page).toHaveURL('http://localhost:3000/favoritos.html');

    await favouritebookspage.Go_ManageBooks_Page();
    await expect(page).toHaveURL('http://localhost:3000/livros.html');

});