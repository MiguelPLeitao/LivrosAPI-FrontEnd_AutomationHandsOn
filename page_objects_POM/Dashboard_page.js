import { test, expect } from '@playwright/test';

class Dashboard_page {

    constructor(page) {
        this.page = page;

        this.headerNAME = page.locator("//span[@id='nomeUsuario']");
        this.headerMYLIBRARY = page.getByRole('heading', { name: '📚 Minha Biblioteca' });
        //atenção aos seguintes têm de ser revistos
        this.fieldTOTALBOOKS = page.locator("//div[@class='stat-card'][.//h3[contains(text(),'Total de Livros')]]//div[@class='number']");
        this.fieldTOTALPAGES = page.locator("//div[@class='stat-card'][.//h3[contains(text(),'Total de Páginas')]]//div[@class='number']");
        this.fieldNUMBERUSERS = page.locator("//div[@class='stat-card'][.//h3[contains(text(),'Usuários Cadastrados')]]//div[@class='number']");
        this.buttonBOOK1 = page.locator("//div[@id='livros-recentes']//div[contains(@class,'book-card')]").first();
        this.buttonBOOK2 = page.locator("//div[@id='livros-recentes']//div[contains(@class,'book-card')]").second();

        this.buttonDASHBOARD = page.getByRole('link', { name: 'Dashboard' });
        this.buttonMANAGEBOOKS = page.getByRole('link', { name: 'Gerenciar Livros' });
        this.buttonMYFAVOURITES = page.getByRole('link', { name: 'Meus Favoritos' });
        this.buttonEXIT = page.getByRole('button', { name: 'Sair' });

    }



    //Ações-Métodos na página de Log In
    async Go_Dashboard_Page() {
        await this.buttonDASHBOARD.click();
    }

    async Go_ManageBooks_Page() {
        await this.buttonMANAGEBOOKS.click();
    }

    async Go_MyFavourites_Page() {
        await this.buttonMYFAVOURITES.click();
    }

    async LogOut() {
        await this.buttonEXIT.click();
    }

    async Click_Book1() {
        await this.buttonBOOK1.click();
    }

    async Click_Book2() {
        await this.buttonBOOK2.click();
    }

}

export default Dashboard_page;