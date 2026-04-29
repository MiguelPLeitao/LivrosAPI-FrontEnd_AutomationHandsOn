// @ts-check
import { test, expect } from '@playwright/test';
import Register_page from '../../page_objects_POM/Register_page';


test('CT-FE-001: Invalid Register with existing Email', async ({ page }) => {
    const registerpage = new Register_page(page);

    await page.goto('http://localhost:3000/registro.html');

    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Email já cadastrado');
        await dialog.accept();
    });

    await registerpage.Register("Admin", "admin@biblioteca.com", "123456");

    await expect(page).toHaveURL('http://localhost:3000/registro.html');
    await expect(await registerpage.inputfieldNOME.inputValue()).toBe("Admin");
    await expect(await registerpage.inputfieldEMAIL.inputValue()).toBe("admin@biblioteca.com");
    await expect(await registerpage.inputfieldSENHA.inputValue()).toBe("123456");
    await expect(await registerpage.inputfieldCONFIRMAR_SENHA.inputValue()).toBe("123456");

});