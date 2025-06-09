const Tarefa = require('../models/Tarefa');

exports.criar = async (req, res) => {
  try {
    const novaTarefa = await Tarefa.create({ ...req.body, usuario: req.usuarioId });
    res.status(201).json({novaTarefa, msg: 'Tarefa criada com sucesso'});
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const tarefas = await Tarefa.find({ usuario: req.usuarioId }).sort({ prazo: 1 });
    res.json(tarefas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const tarefa = await Tarefa.findOne({ usuario: req.usuarioId, _id: id});
    res.json(tarefa);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.atualizar = async (req, res) => {
  const { id } = req.params;
  try {
    const tarefa = await Tarefa.findOneAndUpdate(
      { _id: id, usuario: req.usuarioId },
      req.body,
      { new: true }
    );
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.json({tarefa, msg: 'Tarefa atualizada com sucesso'});
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.remover = async (req, res) => {
  const { id } = req.params;
  try {
    const tarefa = await Tarefa.findOneAndDelete({ _id: id, usuario: req.usuarioId });
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.json({tarefa, msg: 'Tarefa removida com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
