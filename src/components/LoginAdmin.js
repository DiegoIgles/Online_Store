// src/components/LoginAdmin.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios'; // Usa TU instancia configurada
import './LoginAdmin.css';

const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 👉 Usa tu baseURL: http://192.168.100.111:8000/api/
      const response = await axios.post('login', {
        email: email,
        password: password,
      });

      // ✅ Si tu backend devuelve: { token: '...' }
      const token = response.data.token;

      // Guarda token en localStorage
      localStorage.setItem('token', token);

      // ✅ Redirige al dashboard de admin o donde quieras
      navigate('/admin/dashboard');

    } catch (err) {
      console.error(err);

      if (err.response && err.response.status === 401) {
        setError('Credenciales incorrectas.');
      } else {
        setError('Error de conexión o servidor.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login Administrador</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LoginAdmin;
