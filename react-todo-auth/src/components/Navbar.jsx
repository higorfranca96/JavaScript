import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className='navbar'>
        {/* <Link className='navItem' to="/">Home</Link> */}
      {token ? (
        <>
            {/* <Link className='navItem' to="/tarefas">Tarefas</Link> */}
            <Link className='navItem' to="/tarefas">Minhas tarefas</Link>
            <Link className='navItem' to="/tarefas/nova">Cadastrar tarefa</Link>
            <button className='navItem' onClick={handleLogout}>Sair</button>
        </>
      ) : (
        <>
          <Link className='navItem' to="/login">Login</Link>
          <Link className='navItem' to="/register">Cadastro</Link>
        </>
      )}
    </nav>
  );
}