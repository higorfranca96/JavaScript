const request = require('supertest');
const app = require('../index'); // importa app do index.js

describe('Cadastro e login de usuário', () => {
  it('deve cadastrar um novo usuário', async () => {
    const res = await request(app)
      .post('/usuarios/cadastrar')
      .send({ nome: 'João', email: 'joao@email.com', senha: '123456' });

    expect(res.statusCode).toBe(201);
  });

  it('deve logar com sucesso e retornar token', async () => {
    await request(app)
      .post('/usuarios/cadastrar')
      .send({ nome: 'Maria', email: 'maria@email.com', senha: '123456' });

    const res = await request(app)
      .post('/usuarios/login')
      .send({ email: 'maria@email.com', senha: '123456' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
