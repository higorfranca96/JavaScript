const Usuario = require('../models/Usuario');

exports.criarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const novoUsuario = await Usuario.create({ nome, email, senha });
    res.status(201).json({novoUsuario, msg: 'Usuário criado com sucesso'});
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.atualizarUsuario = async (req, res) => {
  const dados = req.body;
  try {
    const usuarioAtualizado = await Usuario.findByIdAndUpdate(req.params.id, dados, { new: true });
    res.json({usuarioAtualizado, msg: 'Usuário atualizado com sucesso'});
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.deletarUsuario = async (req, res) => {
  try {
    const usuarioDeletado = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuarioDeletado) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }
    res.json({ usuarioDeletado, msg: 'Usuário deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
