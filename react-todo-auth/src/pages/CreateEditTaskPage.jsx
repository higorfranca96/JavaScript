import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

export default function CreateEditTaskPage() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [concluida, setConcluida] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.get(`/tarefas/${id}`).then((res) => {
        setTitulo(res.data.titulo);
        setDescricao(res.data.descricao);
        setConcluida(res.data.concluida);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { titulo, descricao, concluida };
    if (id) await api.put(`/tarefas/${id}`, data);
    else await api.post('/tarefas', data);
    navigate('/tarefas');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
      <input placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      <label>
        Concluída:
        <input type="checkbox" checked={concluida} onChange={(e) => setConcluida(e.target.checked)} />
      </label>
      <button type="submit">Salvar</button>
    </form>
  );
}
