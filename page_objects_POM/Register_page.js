import { faker } from '@faker-js/faker';


class Register_page {

    constructor(page) {
        this.page = page;

        this.inputfieldNOME = page.getByRole('textbox', { name: 'Nome:' })
        this.inputfieldEMAIL = page.getByRole('textbox', { name: 'Email:' })
        this.inputfieldSENHA = page.getByRole('textbox', { name: 'Senha:', exact: true })
        this.inputfieldCONFIRMAR_SENHA = page.getByRole('textbox', { name: 'Confirmar Senha:' });
        this.buttonREGISTAR = page.getByRole('button', { name: 'Registrar' });
        this.buttonFACA_LOGIN = page.getByRole('link', { name: 'Faça login' });
    }

    //Ações-Métodos na página de Registo
    async Register(NAME, EMAIL, PASSWORD) {
        const name = NAME || faker.person.fullName();
        const email = EMAIL || faker.internet.email();
        const password = PASSWORD || faker.internet.password({ length: 12 });


        await this.inputfieldNOME.fill(name);
        await this.inputfieldEMAIL.fill(email);
        await this.inputfieldSENHA.fill(password);
        await this.inputfieldCONFIRMAR_SENHA.fill(password);
        await this.buttonREGISTAR.click();
        return { name, email, password };
    }

    async RegisterErrado(NAME, EMAIL, PASSWORD, CONFIRM_PASSWORD) {
        const name = NAME
        const email = EMAIL
        const password = PASSWORD
        const confirm_password = CONFIRM_PASSWORD


        await this.inputfieldNOME.fill(name);
        await this.inputfieldEMAIL.fill(email);
        await this.inputfieldSENHA.fill(password);
        await this.inputfieldCONFIRMAR_SENHA.fill(confirm_password);
        await this.buttonREGISTAR.click();
    }

    async Go_LogIn_Page() {
        await this.buttonFACA_LOGIN.click();
    }


}

export default Register_page;