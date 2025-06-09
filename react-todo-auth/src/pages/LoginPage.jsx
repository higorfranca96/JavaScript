import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/usuarios/login', { email, senha });
    //   login(res.data.token, res.data.user);
      login(res.data.token)
      navigate('/tarefas');
    } catch {
      alert('Erro no login');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="formItem"><p>Email:</p></label>
      <input className="formItem" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label className="formItem"><p>Senha:</p></label>
      <input className="formItem" placeholder="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
      <button className='button' type="submit">Entrar</button>
    </form>
  );
}