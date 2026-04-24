// @ts-check
import { test, expect } from '@playwright/test';
import Register_page from '../../page_objects_POM/Register_page';


test('CT-FE-001: Fluxo Completo de Registo', async ({ page }) => {
  const registerpage = new Register_page(page);

  await page.goto('http://localhost:3000/registro.html');

  await registerpage.Register("Carlos Oliveira", "carlos@teste.com", "senha123");

  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Conta criada com sucesso!');
    await dialog.accept();
  });

  expect(page.url()).toBe('http://localhost:3000/login.html');

  await page.goto('http://localhost:3000/registro.html');

  expect(await registerpage.inputfieldNOME.inputValue()).toBe("");
  expect(await registerpage.inputfieldEMAIL.inputValue()).toBe("");
  expect(await registerpage.inputfieldSENHA.inputValue()).toBe("");
  expect(await registerpage.inputfieldCONFIRMAR_SENHA.inputValue()).toBe("");

});