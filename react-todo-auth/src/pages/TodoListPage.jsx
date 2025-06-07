import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function TodoListPage() {
  const [tarefas, setTarefas] = useState([]);

  const fetchTarefas = async () => {
    const res = await api.get('/tarefas');
    setTarefas(res.data);
  };

  const deleteTarefa = async (id) => {
    await api.delete(`/tarefas/${id}`);
    fetchTarefas();
  };

  useEffect(() => {
    fetchTarefas();
  }, []);

  return (
    <div className='form'>
      <h2 className='listTitle'>Minhas Tarefas</h2>
      <table>
        <thead>
          <tr>
            <th className='tableItem'>Título</th>
            <th className='tableItem'>Descrição</th>
            <th className='tableItem'>Status</th>
            <th className='tableItem'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((t) => (
            <tr key={t._id}>
              <td>{t.titulo}</td>
              <td>{t.descricao}</td>
              <td>{t.concluida ? "Concluída" : "Em aberto"}</td>
              <td>
                <Link className='button' to={`/tarefas/editar/${t._id}`}>Editar</Link>
                <button className='button' onClick={() => deleteTarefa(t._id)}>Excluir</button>
              </td>
            </tr>  
          ))}
        </tbody>
      </table>

      {/* <ul>
        {tarefas.map((t) => (
          <li key={t._id}>
            <strong>{t.titulo}</strong> - {t.descricao} - {t.concluida ? "Concluída" : "Em aberto"}
            <Link to={`/tarefas/editar/${t._id}`}>Editar</Link>
            <button onClick={() => deleteTarefa(t._id)}>Excluir</button>
          </li>
        ))}
      </ul> */}
    </div>
  );
}