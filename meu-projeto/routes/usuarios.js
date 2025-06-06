const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const validate = require('../middlewares/validate');
const { cadastroSchema, loginSchema } = require('../validations/usuarioValidation');

router.post('/cadastrar', validate(cadastroSchema), usuarioController.cadastrar);
router.post('/login', validate(loginSchema), usuarioController.login);


/// rotas do crud de usuários inicial do projeto

// // Listar todos os usuários
// router.get('/', usuarioController.listarUsuarios);

// // Editar usuário
// router.put('/:id', usuarioController.atualizarUsuario);

// // Deletar usuário
// router.delete('/:id', usuarioController.deletarUsuario);

module.exports = router;
