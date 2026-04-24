// @ts-check
import { test, expect } from '@playwright/test';
import Register_page from '../../page_objects_POM/Register_page';


test('CT-FE-001: Fluxo Completo de Registo', async ({ page }) => {
    const registerpage = new Register_page(page);

    await page.goto('http://localhost:3000/registro.html');

    await registerpage.Register("Admin", "admin@biblioteca.com", "123456");

    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Email já cadastrado');
        await dialog.accept();
    });

    expect(page.url()).toBe('http://localhost:3000/registro.html');
    expect(await registerpage.inputfieldNOME.inputValue()).toBe("Admin");
    expect(await registerpage.inputfieldEMAIL.inputValue()).toBe("admin@biblioteca.com");
    expect(await registerpage.inputfieldSENHA.inputValue()).toBe("123456");
    expect(await registerpage.inputfieldCONFIRMAR_SENHA.inputValue()).toBe("123456");

});