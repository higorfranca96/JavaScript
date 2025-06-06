const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.cadastrar = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) return res.status(400).json({ erro: 'E-mail já cadastrado' });

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await Usuario.create({ nome, email, senha: senhaHash });

    res.status(201).json({novoUsuario, msg: 'Usuário cadastrado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ erro: 'Usuário não encontrado' });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ erro: 'Senha incorreta' });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, msg: 'Login realizado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


/// métodos do crud de usuários inicial do projeto

// exports.criarUsuario = async (req, res) => {
//   const { nome, email, senha } = req.body;
//   try {
//     const novoUsuario = await Usuario.create({ nome, email, senha });
//     res.status(201).json({novoUsuario, msg: 'Usuário criado com sucesso'});
//   } catch (err) {
//     res.status(500).json({ erro: err.message });
//   }
// };

// exports.listarUsuarios = async (req, res) => {
//   try {
//     const usuarios = await Usuario.find();
//     res.json(usuarios);
//   } catch (err) {
//     res.status(500).json({ erro: err.message });
//   }
// };

// exports.atualizarUsuario = async (req, res) => {
//   const dados = req.body;
//   try {
//     const usuarioAtualizado = await Usuario.findByIdAndUpdate(req.params.id, dados, { new: true });
//     res.json({usuarioAtualizado, msg: 'Usuário atualizado com sucesso'});
//   } catch (err) {
//     res.status(500).json({ erro: err.message });
//   }
// };

// exports.deletarUsuario = async (req, res) => {
//   try {
//     const usuarioDeletado = await Usuario.findByIdAndDelete(req.params.id);
//     if (!usuarioDeletado) {
//       return res.status(404).json({ msg: 'Usuário não encontrado' });
//     }
//     res.json({ usuarioDeletado, msg: 'Usuário deletado com sucesso' });
//   } catch (err) {
//     res.status(500).json({ erro: err.message });
//   }
// };
