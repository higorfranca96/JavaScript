const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
}, { timestamps: true });

module.exports = mongoose.model('Usuario', UsuarioSchema);
