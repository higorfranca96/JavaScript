require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log('MongoDB conectado');
}).catch(err => console.error(err));

// Rotas
const usuariosRoutes = require('./routes/usuarios');
app.use('/usuarios', usuariosRoutes);

// Inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
