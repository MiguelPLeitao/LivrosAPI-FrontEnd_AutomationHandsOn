// @ts-check
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';





let ValidUserA_ID;
let ValidBookA_ID;

//----------------------------------------------------------------------------------------------------//


test('CT-API-001/002: Create New Valid User and Invalid User trying to use the same as before', async ({ request }) => {

  //Register Valid User non existent previously 
  const ValidUser = {
    "nome": faker.person.fullName(),
    "email": faker.internet.email(),
    "senha": faker.internet.password()
  }

  /**
  * @type {any}
  */

  let response1 = await request.post('http://localhost:3000/registro',
    {
      data: ValidUser
    }
  );

  expect(response1.status()).toBe(201);

  let body1 = await response1.json();
  ValidUserA_ID = body1.usuario.id;

  console.log(body1);

  expect(body1.usuario).toHaveProperty('id');
  expect(body1.usuario).toHaveProperty('nome');
  expect(body1.usuario).toHaveProperty('email');
  expect(body1.usuario).not.toHaveProperty('senha');
  expect(Number.isInteger(body1.usuario.id)).toBe(true);
  expect(typeof body1.usuario.nome).toBe("string");
  expect(typeof body1.usuario.email).toBe("string");
  expect(body1.usuario.id).toBeGreaterThanOrEqual(0);
  expect(body1.usuario.nome).toBe(ValidUser.nome);
  expect(body1.usuario.email).toBe(ValidUser.email);
  expect(body1.mensagem).toBe("Usuário criado com sucesso");



  // Fail Register Valid User existent previously
  let response2 = await request.post('http://localhost:3000/registro',
    {
      data: ValidUser
    }
  );

  expect(response2.status()).toBe(400);

  let body2 = await response2.json();

  console.log(body2);

  expect(body2.mensagem).toBe("Email já cadastrado");

});



//----------------------------------------------------------------------------------------------------//


test('CT-API-003/004: Login with Valid User Account and Invalid Login with Invalid User Account', async ({ request }) => {

  const ValidUser = {
    "nome": faker.person.fullName(),
    "email": faker.internet.email(),
    "senha": faker.internet.password()
  }

  /**
  * @type {any}
  */

  //Register Valid User non existant previously 
  let response3 = await request.post('http://localhost:3000/registro',
    {
      data: ValidUser
    }
  );

  expect(response3.status()).toBe(201);



  //Login with existant Valid User and correct data 
  const startTime = Date.now();

  let response4 = await request.post('http://localhost:3000/login',
    {
      data: {
        "email": ValidUser.email,
        "senha": ValidUser.senha
      }
    }
  );

  const endTime = Date.now();
  const response4Time = endTime - startTime;

  console.log(response4Time);
  console.log(ValidUser.email);
  console.log(ValidUser.senha);

  expect(response4.status()).toBe(200);
  expect(response4Time).toBeLessThan(2000);

  let body4 = await response4.json();

  expect(body4.usuario).not.toHaveProperty('senha');
  expect(body4.mensagem).toBe("Login realizado com sucesso");


  //Login with incorrect email and valid password
  let response5 = await request.post('http://localhost:3000/login',
    {
      data: {
        "email": "adminERRADO.00@biblioteca.com",
        "senha": ValidUser.senha
      }
    }
  );

  expect(response5.status()).toBe(401);

  let body5 = await response5.json();
  expect(body5.mensagem).toBe("Email ou senha incorretos");


  //Login with valid email and incorrect password
  let response6 = await request.post('http://localhost:3000/login',
    {
      data: {
        "email": ValidUser.email,
        "senha": "senhaERRADA.00"
      }
    }
  );

  expect(response6.status()).toBe(401);

  let body6 = await response6.json();
  expect(body6.mensagem).toBe("Email ou senha incorretos");

});




//----------------------------------------------------------------------------------------------------//




test('CT-API-005: Check all books in database', async ({ request }) => {
  let response7 = await request.get('http://localhost:3000/livros');

  expect(response7.status()).toBe(200);

  let body7 = await response7.json();

  console.log(body7);

  expect(Array.isArray(body7)).toBe(true);

  for (const livro of body7) {
    expect(livro).toHaveProperty('id');
    expect(livro).toHaveProperty('nome');
    expect(livro).toHaveProperty('autor');
    expect(livro).toHaveProperty('paginas');
    expect(livro).toHaveProperty('descricao');
    expect(livro).toHaveProperty('imagemUrl');
    expect(livro).toHaveProperty('dataCadastro');
    expect(Number.isInteger(livro.paginas)).toBe(true);
    expect(livro.paginas).toBeGreaterThan(0);

    const date = new Date(livro.dataCadastro);
    expect(date.toISOString()).toBe(livro.dataCadastro);
  }
});




//----------------------------------------------------------------------------------------------------//




test('CT-API-006/007: Check one random existing book in database and Check one non existing book in database', async ({ request }) => {
  //List all the books in database
  let response8 = await request.get('http://localhost:3000/livros');

  expect(response8.status()).toBe(200);

  let body8 = await response8.json();
  expect(Array.isArray(body8)).toBe(true);
  expect(body8.length).toBeGreaterThan(0);

  const randomIndex = Math.floor(Math.random() * body8.length);
  const randomBook = body8[randomIndex];
  const VALIDbookID = randomBook.id;
  const lastBook = body8[body8.length - 1];
  const INVALIDbookID = lastBook.id + 1;

  //Search for a specific book by random ID from database
  let response9 = await request.get(`http://localhost:3000/livros/${VALIDbookID}`);

  expect(response9.status()).toBe(200);

  let body9 = await response9.json();

  expect(body9).toHaveProperty('id');
  expect(body9).toHaveProperty('nome');
  expect(body9).toHaveProperty('autor');
  expect(body9).toHaveProperty('paginas');
  expect(body9).toHaveProperty('descricao');
  expect(body9).toHaveProperty('imagemUrl');
  expect(body9).toHaveProperty('dataCadastro');
  expect(body9.id).toBe(VALIDbookID);
  expect(body9.nome).not.toBeNull();
  expect(body9.nome.trim().length).toBeGreaterThan(0);


  //Search for a non existant book with invalid ID
  let response10 = await request.get(`http://localhost:3000/livros/${INVALIDbookID}`);

  expect(response10.status()).toBe(404);

  let body10 = await response10.json();

  expect(body10.mensagem).toBe("Livro não encontrado");

});





//----------------------------------------------------------------------------------------------------//




test('CT-API-008/009/010: Register New Book, Update Book, Delete Book, Confirm Book Delete', async ({ request }) => {
  //Register New Book
  const ValidBook = {
    "nome": faker.book.title(),
    "autor": faker.person.fullName(),
    "paginas": faker.number.int({ min: 10, max: 2000 }),
    "descricao": faker.lorem.paragraph(),
    "imagemUrl": faker.image.url()
  }

  /**
  * @type {any}
  */

  let response11 = await request.post('http://localhost:3000/livros',
    {
      data: ValidBook
    }
  );

  expect(response11.status()).toBe(201);

  let body11 = await response11.json();
  ValidBookA_ID = body11.id;

  console.log(body11);

  expect(body11).toHaveProperty('id');
  expect(body11).toHaveProperty('nome');
  expect(body11).toHaveProperty('autor');
  expect(body11).toHaveProperty('paginas');
  expect(body11).toHaveProperty('descricao');
  expect(body11).toHaveProperty('imagemUrl');
  expect(body11).toHaveProperty('dataCadastro');
  expect(Number.isInteger(body11.id)).toBe(true);
  expect(Number.isInteger(body11.paginas)).toBe(true);
  expect(typeof body11.nome).toBe("string");
  expect(typeof body11.autor).toBe("string");
  expect(typeof body11.descricao).toBe("string");
  expect(typeof body11.imagemUrl).toBe("string");


  expect(body11.id).toBeGreaterThanOrEqual(0);
  expect(body11.paginas).toBeGreaterThan(9);
  expect(body11.paginas).toBeLessThan(2001);
  expect(body11.dataCadastro).not.toBeNull;
  expect(body11.dataCadastro.trim().length).toBeGreaterThan(0);

  const date = new Date(body11.dataCadastro);
  expect(date.toISOString()).toBe(body11.dataCadastro);

  expect(body11.nome).toBe(ValidBook.nome);
  expect(body11.autor).toBe(ValidBook.autor);
  expect(body11.paginas).toBe(ValidBook.paginas);
  expect(body11.descricao).toBe(ValidBook.descricao);
  expect(body11.imagemUrl).toBe(ValidBook.imagemUrl);


  //Update Book
  let response12 = await request.put(`http://localhost:3000/livros/${ValidBookA_ID}`,
    {
      data: {
        "nome": "Editado",
        "autor": "Editado",
        "paginas": 2000,
        "descricao": "Editado",
        "imagemUrl": "Editado"
      }
    }
  );

  expect(response12.status()).toBe(200);

  let body12 = await response12.json();

  console.log(body12);

  expect(body12).toHaveProperty('id');
  expect(body12).toHaveProperty('nome');
  expect(body12).toHaveProperty('autor');
  expect(body12).toHaveProperty('paginas');
  expect(body12).toHaveProperty('descricao');
  expect(body12).toHaveProperty('imagemUrl');
  expect(body12).toHaveProperty('dataCadastro');

  expect(body12.id).toBe(ValidBookA_ID);
  expect(body12.nome).toBe("Editado");
  expect(body12.autor).toBe("Editado");
  expect(body12.paginas).toBe(2000);
  expect(body12.descricao).toBe("Editado");
  expect(body12.imagemUrl).toBe("Editado");


  //Delete Book
  let response13 = await request.delete(`http://localhost:3000/livros/${ValidBookA_ID}`);

  expect(response13.status()).toBe(200);

  let body13 = await response13.json();

  expect(body13.mensagem).toBe("Livro removido com sucesso");



  //Confirm Book Delete
  let response14 = await request.get(`http://localhost:3000/livros/${ValidBookA_ID}`);

  expect(response14.status()).toBe(404);

});




//----------------------------------------------------------------------------------------------------//




test('CT-API-011: Verify Library Statistics', async ({ request }) => {
  //Verify statistics fields
  let response15 = await request.get('http://localhost:3000/estatisticas');

  expect(response15.status()).toBe(200);

  let body15 = await response15.json();

  expect(body15).toHaveProperty('totalLivros');
  expect(body15).toHaveProperty('totalPaginas');
  expect(body15).toHaveProperty('totalUsuarios');
  expect(Number.isInteger(body15.totalLivros)).toBe(true);
  expect(Number.isInteger(body15.totalPaginas)).toBe(true);
  expect(Number.isInteger(body15.totalUsuarios)).toBe(true);
  expect(body15.totalLivros).toBeGreaterThanOrEqual(0);
  expect(body15.totalPaginas).toBeGreaterThanOrEqual(0);
  expect(body15.totalUsuarios).toBeGreaterThanOrEqual(0);


  //Check all books in library and sum all their pages
  let response16 = await request.get('http://localhost:3000/livros');
  expect(response16.status()).toBe(200);

  let body16 = await response16.json();
  expect(Array.isArray(body16)).toBe(true);

  let totalPaginas = 0;

  for (const livro of body16) {
    totalPaginas += livro.paginas;
  }

  console.log(totalPaginas);

  expect(body15.totalLivros).toBe(body16.length);
  expect(body15.totalPaginas).toBe(totalPaginas);

});





//----------------------------------------------------------------------------------------------------//




test('CT-API-012/013/014: Add Book to Favourites, Check Favourites List, Delete Book from Favourites, Confirm Book Delete from Favourites', async ({ request }) => {
  //Register Valid User non existent previously 
  const ValidUser = {
    "nome": faker.person.fullName(),
    "email": faker.internet.email(),
    "senha": faker.internet.password()
  }

  /**
  * @type {any}
  */

  let response16 = await request.post('http://localhost:3000/registro',
    {
      data: ValidUser
    }
  );

  expect(response16.status()).toBe(201);

  let body16 = await response16.json();
  console.log(body16);
  let ValidUserB_ID = body16.usuario.id;


  //Register New Book
  const ValidBook = {
    "nome": faker.book.title(),
    "autor": faker.person.fullName(),
    "paginas": faker.number.int({ min: 10, max: 2000 }),
    "descricao": faker.lorem.paragraph(),
    "imagemUrl": faker.image.url()
  }

  /**
  * @type {any}
  */

  let response17_1 = await request.post('http://localhost:3000/livros',
    {
      data: ValidBook
    }
  );

  expect(response17_1.status()).toBe(201);

  let body17_1 = await response17_1.json();
  let ValidBookB_ID = body17_1.id;


  //Register New Book
  let response17_2 = await request.post('http://localhost:3000/livros',
    {
      data: ValidBook
    }
  );

  expect(response17_2.status()).toBe(201);

  let body17_2 = await response17_2.json();
  let ValidBookC_ID = body17_2.id;


  //Add Book1 to Favourites
  let response18 = await request.post('http://localhost:3000/favoritos',
    {
      data: {
        "usuarioId": ValidUserB_ID,
        "livroId": ValidBookB_ID
      }
    }
  );

  expect(response18.status()).toBe(201);

  let body18 = await response18.json();

  expect(body18.mensagem).toBe("Livro adicionado aos favoritos");


  //Add Book2 to Favourites
  let response19 = await request.post('http://localhost:3000/favoritos',
    {
      data: {
        "usuarioId": ValidUserB_ID,
        "livroId": ValidBookC_ID
      }
    }
  );

  expect(response19.status()).toBe(201);

  let body19 = await response19.json();

  expect(body19.mensagem).toBe("Livro adicionado aos favoritos");


  //Check Favourites List of a Specific User
  let response20 = await request.get(`http://localhost:3000/favoritos/${ValidUserB_ID}`);

  expect(response20.status()).toBe(200);

  let body20 = await response20.json();
  expect(Array.isArray(body20)).toBe(true);
  expect(body20.length).toBe(2);

  for (const livro of body20) {
    expect(livro).toHaveProperty('id');
    expect(livro.id === ValidBookB_ID || livro.id === ValidBookC_ID).toBe(true);
  }

  console.log(body20);


  //Delete Book1 from Favourites
 let response21 = await request.delete('http://localhost:3000/favoritos',
    {
      data: {
        "usuarioId": ValidUserB_ID,
        "livroId": ValidBookB_ID
      }
    }
  );

  expect(response21.status()).toBe(200);

  let body21 = await response21.json();

  expect(body21.mensagem).toBe("Livro removido dos favoritos");



  //Confirm Book Delete from Favourites
  let response22 = await request.delete('http://localhost:3000/favoritos',
    {
      data: {
        "usuarioId": ValidUserB_ID,
        "livroId": ValidBookB_ID
      }
    }
  );

  expect(response22.status()).toBe(404);

});