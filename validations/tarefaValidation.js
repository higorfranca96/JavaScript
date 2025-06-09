const Joi = require('joi');

const tarefaSchema = Joi.object({
  titulo: Joi.string().min(3).required(),
  descricao: Joi.string().allow('').optional(),
  concluida: Joi.boolean().optional(),
  prazo: Joi.date().optional()
});

module.exports = { tarefaSchema };
