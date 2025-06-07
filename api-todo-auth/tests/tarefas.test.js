const request = require('supertest');
const app = require('../index'); // importa app do index.js

describe('Cadastrar usuário, realizar login e realizar CRUD de tarefas', () => {
  it('CRUD tarefas', async () => {
    // Primeiro, cria um usuário para garantir que temos um token válido
    await request(app) 
      .post('/usuarios/cadastrar')
      .send({ nome: 'Maria', email: 'maria@email.com', senha: '123456' });
    
    // Realiza o login para obter o token
    const loginRes = await request(app) 
      .post('/usuarios/login')
      .send({ email: 'maria@email.com', senha: '123456' });

    const token = loginRes.body.token;

    // Agora, usa o token para cadastrar uma nova tarefa
    const cadastrarRes = await request(app) 
      .post('/tarefas')
      .set('Authorization', `Bearer ${token}`) // precisa usar crase e não aspas simples
      .send({ titulo: 'Estudar Node.js'});

    const id = cadastrarRes.body.novaTarefa._id;

    // Atualiza a tarefa
    const editarRes = await request(app) 
      .put('/tarefas/'+id)
      .set('Authorization', `Bearer ${token}`)
      .send({ titulo: 'Estudar Node.js e Express' });

    // Lista as tarefas
    const listarRes = await request(app) 
      .get('/tarefas')
      .set('Authorization', `Bearer ${token}`)
      .send();

    // Remove a tarefa
    const removerRes = await request(app)
      .delete('/tarefas/'+id)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(cadastrarRes.statusCode).toBe(201);
    expect(editarRes.body.msg).toBe('Tarefa atualizada com sucesso');
    expect(listarRes.body.length).toBeGreaterThan(0);
    expect(removerRes.body.msg).toBe('Tarefa removida com sucesso');
  });
  
});
