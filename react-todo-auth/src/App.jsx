import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TodoListPage from './pages/TodoListPage';
import CreateEditTaskPage from './pages/CreateEditTaskPage';
import PrivateRoute from './utils/privateRoute';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tarefas" element={<PrivateRoute><TodoListPage /></PrivateRoute>} />
        <Route path="/tarefas/nova" element={<PrivateRoute><CreateEditTaskPage /></PrivateRoute>} />
        <Route path="/tarefas/editar/:id" element={<PrivateRoute><CreateEditTaskPage /></PrivateRoute>} />
      </Routes>
    </>
  );
}