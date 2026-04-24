// @ts-check
import { test, expect } from '@playwright/test';
import Register_page from '../../page_objects_POM/Register_page';


test('CT-FE-001: Fluxo Completo de Registo', async ({ page }) => {
  const registerpage = new Register_page(page);

  await page.goto('http://localhost:3000/registro.html');

  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Conta criada com sucesso!');
    await dialog.accept();
  });

  await registerpage.Register();

  await expect(page).toHaveURL('http://localhost:3000/login.html');

  await page.goto('http://localhost:3000/registro.html');

  await expect(await registerpage.inputfieldNOME.inputValue()).toBe("");
  await expect(await registerpage.inputfieldEMAIL.inputValue()).toBe("");
  await expect(await registerpage.inputfieldSENHA.inputValue()).toBe("");
  await expect(await registerpage.inputfieldCONFIRMAR_SENHA.inputValue()).toBe("");

});