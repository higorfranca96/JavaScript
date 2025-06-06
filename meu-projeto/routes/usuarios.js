const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Criar usuário
router.post('/', usuarioController.criarUsuario);

// Listar todos os usuários
router.get('/', usuarioController.listarUsuarios);

// Editar usuário
router.put('/:id', usuarioController.atualizarUsuario);

// Deletar usuário
router.delete('/:id', usuarioController.deletarUsuario);

module.exports = router;
