
class BookDetails_page {

    constructor(page) {
        this.page = page;

        this.headerNAME = page.locator("//span[@id='nomeUsuario']");
        this.headerMYLIBRARY = page.getByRole('heading', { name: '📚 Detalhes do Livro' });

        this.buttonDASHBOARD = page.getByRole('link', { name: 'Dashboard' });
        this.buttonMANAGEBOOKS = page.getByRole('link', { name: 'Gerenciar Livros' });
        this.buttonMYFAVOURITES = page.getByRole('link', { name: 'Meus Favoritos' });
        this.buttonEXIT = page.getByRole('button', { name: 'Sair' });

        this.imageBOOK = page.locator('//div[@class="book-image"]/img');
        this.headerBOOK_TITLE = page.locator('.book-info h2');
        this.headerBOOK_AUTHOR = page.locator('.info-item', { hasText: 'Autor:' });
        this.fieldBOOK_PAGE_COUNT = page.locator('.info-item', { hasText: 'Páginas:' });
        this.fieldBOOK_DESCRIPTION = page.getByText('Descrição:');
        this.fieldBOOK_DATE_ADDED = page.getByText('Data de Cadastro:');
        this.togglebuttonADD_REMOVE_FAVOURITES = page.locator('button[onclick*="toggleFavorito"]');
        this.buttonDELETE_BOOK = page.getByRole('button', { name: '🗑️ Deletar Livro' });
        this.buttonGO_BACK = page.getByRole('button', { name: '← Voltar' });

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

    async Click_ADD_REMOVE_FAVOURITES() {
        await this.togglebuttonADD_REMOVE_FAVOURITES.click();
    }

    async Click_DELETE_BOOK() {
        await this.buttonDELETE_BOOK.click();
    }

    async Click_GO_BACK() {
        await this.buttonGO_BACK.click();
    }

}

export default BookDetails_page;