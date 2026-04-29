import { faker } from '@faker-js/faker';

const ValidBook = {
    book_name: faker.book.title(),
    author: faker.book.author(),
    pageCount: faker.number.int({ min: 10, max: 1000 }),
    book_description: faker.lorem.paragraph(),
    book_image: faker.image.url(),
}

class Book_List_Add_page {

    constructor(page) {
        this.page = page;

        this.inputfieldBOOK_NAME = page.getByRole('textbox', { name: 'Nome do Livro:' })
        this.inputfieldAUTHOR = page.getByRole('textbox', { name: 'Autor:' })
        this.spinbuttonPAGE_COUNT = page.getByRole('spinbutton', { name: 'Número de Páginas:' })
        this.inputfieldBOOK_DESCRIPTION = page.getByRole('textbox', { name: 'Descrição:' })
        this.inputfieldBOOK_IMAGE = page.getByRole('textbox', { name: 'URL da Imagem:' })
        this.buttonADICIONAR_LIVRO = page.getByRole('button', { name: 'Adicionar Livro' })

        this.buttonDASHBOARD = page.getByRole('link', { name: 'Dashboard' });
        this.buttonMANAGEBOOKS = page.getByRole('link', { name: 'Gerenciar Livros' });
        this.buttonMYFAVOURITES = page.getByRole('link', { name: 'Meus Favoritos' });
        this.buttonEXIT = page.getByRole('button', { name: 'Sair' });

        this.buttonBOOK1 = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(0);
        this.buttonBOOK2 = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(1);
        this.buttonBOOK3 = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(2);
        this.buttonBOOK4 = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(3);
        this.buttonBOOK5 = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(4);
        this.buttonBOOK6 = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(5);
        this.buttonBOOK7 = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(6);
        this.buttonBOOK8 = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(7);
        this.buttonBOOK9 = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(8);
        this.buttonBOOK10 = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(9);

    }

    //Ações-Métodos na página de Registo
    async Add_Book(TITLE, AUTHOR, PAGE_COUNT, IMAGE_URL) {
        const title = TITLE || ValidBook.book_name;
        const author = AUTHOR || ValidBook.author;
        const pageCount = PAGE_COUNT || ValidBook.pageCount;
        const description = ValidBook.book_description;
        const imageUrl = IMAGE_URL || ValidBook.book_image;

        await this.inputfieldBOOK_NAME.fill(title);
        await this.inputfieldAUTHOR.fill(author);
        await this.spinbuttonPAGE_COUNT.fill(String(pageCount));
        await this.inputfieldBOOK_DESCRIPTION.fill(description);
        await this.inputfieldBOOK_IMAGE.fill(imageUrl);
        await this.buttonADICIONAR_LIVRO.click();
        return { title, author };
    }

    async Add_Book_Wrong(TITLE, AUTHOR, PAGE_COUNT) {
        const title = TITLE;
        const author = AUTHOR;
        const pageCount = PAGE_COUNT;

        await this.inputfieldBOOK_NAME.fill(title);
        await this.inputfieldAUTHOR.fill(author);
        await this.spinbuttonPAGE_COUNT.fill(String(pageCount));
        await this.buttonADICIONAR_LIVRO.click();
    }

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

export default Book_List_Add_page;