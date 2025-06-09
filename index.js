require('dotenv').config();
const express        = require('express');
const mongoose       = require('mongoose');
const usuariosRoutes = require('./routes/usuarios');
const tarefasRoutes  = require('./routes/tarefas');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Rotas
app.use('/usuarios', usuariosRoutes);
app.use('/tarefas', tarefasRoutes);

// Só conecta ao MongoDB se não estiver em ambiente de teste
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI, {
  }).then(() => {
    console.log('MongoDB conectado');
  }).catch(err => console.error(err));

  // Inicia servidor
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app; // Exporta app para testes




