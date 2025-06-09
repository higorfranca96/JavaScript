import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

export default function CreateEditTaskPage() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [concluida, setConcluida] = useState(false);
  const [prazo, setPrazo] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) { //trás os dados da tarefa se o id estiver presente
      api.get(`/tarefas/${id}`).then((res) => {
        setTitulo(res.data.titulo);
        setDescricao(res.data.descricao);
        setConcluida(res.data.concluida);
        setPrazo(res.data.prazo ? new Date(res.data.prazo).toISOString().split('T')[0] : '');
      });
    }else{ //se não tiver id, limpa os campos
      setTitulo('');
      setDescricao('');
      setConcluida(false);
      setPrazo('');
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { titulo, descricao, concluida, prazo };
    if (id) await api.put(`/tarefas/${id}`, data);
    else await api.post('/tarefas', data);
    navigate('/tarefas');
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <label className='formItem'><p>Título:</p></label>
      <input className='formItem' placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />

      <label className='formItem'><p>Descrição:</p></label>
      <textarea className='formItem' placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />

      <label className='formItem'><p>Prazo:</p></label>
      <input className='formItemDS' type='date' value={prazo} onChange={(e) => setPrazo(e.target.value)} />

      <label className='formItem'><p>Status:</p></label>
      <select className='formItemDS' value={concluida} onChange={(e) => setConcluida(e.target.value)}>
        <option value="false">Em aberto</option>
        <option value="true">Concluída</option>
      </select>
  
      <button type="submit" className="button">Salvar</button>
    </form>
  );
}
