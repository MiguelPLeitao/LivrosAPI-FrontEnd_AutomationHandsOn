import { test, expect } from '@playwright/test';

class LogIn_page {

    constructor(page) {
        this.page = page;

        this.inputfieldEMAIL = page.getByRole('textbox', { name: 'Email:' });
        this.inputfieldSENHA = page.getByRole('textbox', { name: 'Senha:' });
        this.buttonENTRAR = page.getByRole('button', { name: 'Entrar' });
        this.buttonREGISTE = page.getByRole('link', { name: 'Registre-se' });
    }



    //Ações-Métodos na página de Log In
    async LogIn(EMAIL, PASSWORD) {

        await this.inputfieldEMAIL.clear();
        await this.inputfieldEMAIL.fill(EMAIL);
        await this.inputfieldSENHA.clear();
        await this.inputfieldSENHA.fill(PASSWORD);
        await this.buttonENTRAR.click();
    }

    async Go_Register_Page() {
        await this.buttonREGISTE.click();
    }


}
export default LogIn_page;