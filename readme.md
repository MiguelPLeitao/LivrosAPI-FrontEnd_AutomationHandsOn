# 📚 Sistema de Biblioteca - CRUD Expandido

Sistema completo de gerenciamento de biblioteca com autenticação, dashboard, favoritos e interface moderna. Desenvolvido para demonstrar testes de API (backend) e interface (frontend) utilizando Node.js, Express e JavaScript puro.

## 🎯 Sobre o Projeto

Este projeto foi criado como ambiente de aprendizado para **automação de testes** de API e interface web. Oferece um sistema funcional com múltiplas páginas, autenticação de usuários e operações CRUD completas, ideal para praticar com ferramentas como Selenium, Cypress, Playwright, Postman e Rest Assured.

## ✨ Funcionalidades

### 🔐 Autenticação
- **Registro de Usuários:** Criação de conta com validação de email duplicado
- **Login:** Autenticação com email e senha
- **Proteção de Rotas:** Páginas protegidas que exigem autenticação
- **Logout:** Encerramento seguro de sessão

### 📖 Gerenciamento de Livros
- **Criar Livro:** Adicionar livros com nome, autor, páginas, descrição e imagem
- **Listar Livros:** Visualizar todos os livros cadastrados em grid responsivo
- **Buscar por ID:** Consultar informações detalhadas de um livro específico
- **Atualizar Livro:** Editar informações de livros existentes
- **Deletar Livro:** Remover livros com confirmação de segurança

### 📊 Dashboard
- **Estatísticas em Tempo Real:** Total de livros, páginas e usuários
- **Últimos Cadastros:** Exibição dos 5 livros mais recentes
- **Cards Visuais:** Interface moderna com cards informativos

### ❤️ Sistema de Favoritos
- **Adicionar aos Favoritos:** Marcar livros preferidos
- **Remover dos Favoritos:** Desmarcar livros
- **Lista Personalizada:** Página dedicada aos livros favoritados

### 🎨 Interface
- **Design Moderno:** Layout responsivo com gradientes e animações
- **Grid Responsivo:** Adaptação automática para desktop, tablet e mobile
- **Navegação Intuitiva:** Menu de navegação consistente em todas as páginas
- **Feedback Visual:** Alertas e confirmações para todas as ações

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web minimalista
- **CORS** - Controle de acesso entre origens
- **Swagger UI Express** - Documentação interativa da API
- **Swagger JSDoc** - Geração de documentação a partir de comentários

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização com gradientes, flexbox e grid
- **JavaScript (ES6+)** - Lógica da aplicação e consumo de API
- **Fetch API** - Requisições HTTP assíncronas

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) versão 14.x ou superior (LTS recomendada)
- npm (gerenciador de pacotes do Node.js)
- Git (para clonar o repositório)

## 🚀 Como Executar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/brunonf15/crud-livros-expandido.git
cd crud-livros-expandido
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor

```bash
npm start
```

O servidor iniciará na porta **3000** por padrão.

### 4. Acesse a aplicação

- **Aplicação:** [http://localhost:3000/login.html](http://localhost:3000/login.html)
- **Documentação Swagger:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **API Base URL:** [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
crud-livros-expandido/
├── package.json              # Dependências e scripts
├── server.js                 # Servidor Express e rotas da API
├── README.md                # Documentação do projeto
└── public/                  # Arquivos estáticos
    ├── css/
    │   └── style.css        # Estilos globais da aplicação
    ├── js/
    │   ├── login.js         # Lógica da página de login
    │   ├── registro.js      # Lógica da página de registro
    │   ├── dashboard.js     # Lógica do dashboard
    │   ├── livros.js        # Lógica de gerenciamento de livros
    │   ├── detalhes.js      # Lógica da página de detalhes
    │   └── favoritos.js     # Lógica da página de favoritos
    ├── login.html           # Página de login
    ├── registro.html        # Página de registro
    ├── dashboard.html       # Dashboard principal
    ├── livros.html          # Gerenciamento de livros
    ├── detalhes.html        # Detalhes de um livro
    └── favoritos.html       # Lista de favoritos
```

## 🔌 Endpoints da API

### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/registro` | Criar nova conta de usuário |
| POST | `/login` | Autenticar usuário existente |

### Livros

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/livros` | Listar todos os livros |
| GET | `/livros/:id` | Buscar livro por ID |
| POST | `/livros` | Adicionar novo livro |
| PUT | `/livros/:id` | Atualizar livro existente |
| DELETE | `/livros/:id` | Deletar livro |
| GET | `/livros/recentes/ultimos` | Obter 5 livros mais recentes |

### Estatísticas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/estatisticas` | Obter estatísticas gerais (total de livros, páginas, usuários) |

### Favoritos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/favoritos/:usuarioId` | Listar favoritos de um usuário |
| POST | `/favoritos` | Adicionar livro aos favoritos |
| DELETE | `/favoritos` | Remover livro dos favoritos |

## 📖 Documentação Completa da API

A documentação interativa completa está disponível via **Swagger UI**:

**Local:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Através do Swagger você pode:
- Visualizar todos os endpoints disponíveis
- Testar requisições diretamente na interface
- Ver exemplos de requisições e respostas
- Entender a estrutura de dados (schemas)

## 🎓 Uso para Testes Automatizados

Este projeto foi especialmente projetado para servir como base para **automação de testes**.

### Arquitetura de Testes

- **Testes de UI:** localizados em `tests/FrontEnd/` usando **Playwright**.
- **Testes de API:** localizados em `tests/API.spec.js` cobrindo endpoints REST.
- **Page Object Model (POM):** implementado em `page_objects_POM/` para separar locators e ações da lógica de teste.

### Page Object Model (POM)

A pasta `page_objects_POM/` contém classes que representam páginas da aplicação.
Cada classe encapsula:
- locators dos elementos da página
- ações reutilizáveis (cliques, preenchimento, navegação)
- validações específicas de página

Exemplo de estrutura:
- `Register_page.js` — campos de registro e método `Register()`
- `LogIn_page.js` — campos de login e método `LogIn()`
- `Dashboard_page.js` — elementos do dashboard e navegação
- `BookDetails_page.js` — botão favoritos, deletar e voltar

### Organização dos Tests

Os arquivos `CT-FE-xxx*.spec.js` cobrem cenários frontend por número de caso:
- `CT-FE-006.spec.js` — registro de novo usuário e acesso ao dashboard
- `CT-FE-008.spec.js` — validação de erro ao tentar adicionar livro com dados inválidos
- `CT-FE-011-012-013.spec.js` — fluxos de favoritos e detalhes do livro

### Boas práticas aplicadas

- Cada teste deve ser independente e criar seus próprios dados.
- O cadastro de usuários deve gerar emails únicos a cada execução.
- A validação de estilo (`toHaveCSS`) compara o valor computado do navegador, como `rgb(...)`.
- Evite `page.waitForTimeout()` sempre que possível; prefira `expect(locator).toBeVisible({ timeout: ... })`.

### Geração de dados únicos

No POM de registro, é importante gerar um usuário novo a cada chamada:
- não use um objeto de dados estático importado uma única vez
- use `faker.internet.email()` e `faker.person.fullName()` dentro do método `Register()` para garantir um email diferente por teste

### Validação de estilo e cores

Se você quiser validar uma mudança de cor de botão no Playwright:
- Use `await expect(button).toHaveCSS('background-color', 'rgb(231, 76, 60)');`
- Se o valor de cor estiver em hex, converta para `rgb(...)` antes da comparação.

### Resultados dos Testes

Os testes foram executados com sucesso em **Chromium** e **WebKit** browsers, totalizando **40 testes** (20 API + 20 FrontEnd).

- **Status Geral:** ✅ Todos os testes passaram (40/40)
- **Tempo de Execução:** 2.7 minutos
- **Compatibilidade:** Funciona em Chromium e WebKit (Safari)


### Ferramentas Compatíveis

- **API Testing:** Postman, Insomnia, Rest Assured, Playwright, Cypress
- **UI Testing:** Selenium WebDriver, Cypress, Playwright, Puppeteer

## 💡 Dados de Teste

O sistema já vem com dados pré-cadastrados para facilitar os testes:

### Usuário Padrão
- **Email:** admin@biblioteca.com
- **Senha:** 123456

### Livros Pré-cadastrados
1. Clean Code - Robert C. Martin (464 páginas)
2. Harry Potter - J.K. Rowling (309 páginas)

## 📝 Licença

Este projeto é de código aberto e está disponível para fins educacionais.

## 👤 Autor

**Bruno Figueiredo**
- GitHub: [@brunonf15](https://github.com/brunonf15)
- LinkedIn: [Bruno Figueiredo](https://www.linkedin.com/in/brunonascimento15/)

**Miguel Leitão** (QA tests)
- GitHub: [@MiguelPLeitao](https://github.com/MiguelPLeitao)
- LinkedIn: [Miguel Leitão](https://www.linkedin.com/in/miguel-leit%C3%A3o-280650379/)

***

⭐ Se este projeto foi útil para você, considere dar uma estrela no GitHub!
