// @ts-check
import { test, expect } from '@playwright/test';
import Register_page from '../../page_objects_POM/Register_page';


test('CT-FE-002: Non Corresponding Password Validation', async ({ page }) => {
    const registerpage = new Register_page(page);

    await page.goto('http://localhost:3000/registro.html');

    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('As senhas não coincidem!');
        await dialog.accept();
    });

    await registerpage.RegisterErrado("Carlos Oliveira", "carlos@teste.com", "senha123", "senha456");

    await expect(page).toHaveURL('http://localhost:3000/registro.html');
    await expect(await registerpage.inputfieldNOME.inputValue()).toBe("Carlos Oliveira");
    await expect(await registerpage.inputfieldEMAIL.inputValue()).toBe("carlos@teste.com");
    await expect(await registerpage.inputfieldSENHA.inputValue()).toBe("senha123");
    await expect(await registerpage.inputfieldCONFIRMAR_SENHA.inputValue()).toBe("senha456");

});