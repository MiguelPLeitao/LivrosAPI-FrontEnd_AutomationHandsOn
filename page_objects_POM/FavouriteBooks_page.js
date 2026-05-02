
class FavouriteBooks_page {

    constructor(page) {
        this.page = page;

        this.buttonDASHBOARD = page.getByRole('link', { name: 'Dashboard' });
        this.buttonMANAGEBOOKS = page.getByRole('link', { name: 'Gerenciar Livros' });
        this.buttonMYFAVOURITES = page.getByRole('link', { name: 'Meus Favoritos' });
        this.buttonEXIT = page.getByRole('button', { name: 'Sair' });

        this.textNO_BOOKS = page.getByText('Você ainda não tem livros');
        this.buttonBOOK1 = page.locator("//div[@id='lista-favoritos']//div[contains(@class,'book-card')]").nth(0);
        this.buttonBOOK2 = page.locator("//div[@id='lista-favoritos']//div[contains(@class,'book-card')]").nth(1);
        this.buttonBOOK3 = page.locator("//div[@id='lista-favoritos']//div[contains(@class,'book-card')]").nth(2);
        this.buttonBOOK4 = page.locator("//div[@id='lista-favoritos']//div[contains(@class,'book-card')]").nth(3);
        this.buttonBOOK5 = page.locator("//div[@id='lista-favoritos']//div[contains(@class,'book-card')]").nth(4);
        this.buttonBOOK6 = page.locator("//div[@id='lista-favoritos']//div[contains(@class,'book-card')]").nth(5);
        this.buttonBOOK7 = page.locator("//div[@id='lista-favoritos']//div[contains(@class,'book-card')]").nth(6);
        this.buttonBOOK8 = page.locator("//div[@id='lista-favoritos']//div[contains(@class,'book-card')]").nth(7);
        this.buttonBOOK9 = page.locator("//div[@id='lista-favoritos']//div[contains(@class,'book-card')]").nth(8);
        this.buttonBOOK10 = page.locator("//div[@id='lista-favoritos']//div[contains(@class,'book-card')]").nth(9);

    }

    //Ações-Métodos na página de Registo

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

    async Click_Book3() {
        await this.buttonBOOK3.click();
    }

    async Click_Book4() {
        await this.buttonBOOK4.click();
    }

    async Click_Book5() {
        await this.buttonBOOK5.click();
    }

    async Click_Book6() {
        await this.buttonBOOK6.click();
    }

    async Click_Book7() {
        await this.buttonBOOK7.click();
    }

    async Click_Book8() {
        await this.buttonBOOK8.click();
    }

    async Click_Book9() {
        await this.buttonBOOK9.click();
    }

    async Click_Book10() {
        await this.buttonBOOK10.click();
    }

}

export default FavouriteBooks_page;