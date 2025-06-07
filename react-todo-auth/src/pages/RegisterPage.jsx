import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function RegisterPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/usuarios/cadastrar', { nome, email, senha });
      alert('Cadastro realizado');
      navigate('/login');
    } catch {
      alert('Erro ao cadastrar');
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <label><p>Informe seu nome:</p></label>
      <input className='formItem' placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <label><p>Informe seu e-mail:</p></label>
      <input className='formItem' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label><p>Informe sua senha:</p></label>
      <input className='formItem' placeholder="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
      <button type="submit" className='button'>Cadastrar</button>
    </form>
  );
}