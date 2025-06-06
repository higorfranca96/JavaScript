const Joi = require('joi');

const cadastroSchema = Joi.object({
  nome: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  senha: Joi.string().required()
});

module.exports = { cadastroSchema, loginSchema };
