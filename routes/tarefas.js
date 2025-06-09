const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { tarefaSchema } = require('../validations/tarefaValidation');

router.use(auth);

router.post('/', validate(tarefaSchema), tarefaController.criar);
router.put('/:id', validate(tarefaSchema), tarefaController.atualizar);
router.get('/', tarefaController.listar);
router.get('/:id', tarefaController.getById);
router.delete('/:id', tarefaController.remover);

module.exports = router;

