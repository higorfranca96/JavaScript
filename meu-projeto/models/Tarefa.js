const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String,
  concluida: { type: Boolean, default: false },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Tarefa', tarefaSchema);
