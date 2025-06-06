const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const validate = require('../middlewares/validate');
const { cadastroSchema, loginSchema } = require('../validations/usuarioValidation');

router.post('/cadastrar', validate(cadastroSchema), usuarioController.cadastrar);
router.post('/login', validate(loginSchema), usuarioController.login);

module.exports = router;
