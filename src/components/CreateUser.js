// src/components/CreateUser.jsx

import React, { useState } from 'react';
import axios from '../utils/axios'; // Usa tu instancia base
import { useNavigate } from 'react-router-dom';
import './CreateUser.css';

const CreateUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post('register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      setSuccess('Usuario creado con éxito ✅');
      // Opcional: redirigir al dashboard después de unos segundos
      setTimeout(() => navigate('/admin/dashboard'), 2000);

    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        const errors = err.response.data;
        const firstError = typeof errors === 'object'
          ? Object.values(errors)[0]
          : 'Error al registrar.';
        setError(Array.isArray(firstError) ? firstError[0] : firstError);
      } else {
        setError('Error de servidor.');
      }
    }
  };

  return (
    <div className="create-user-container">
      <h2>Crear Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit">Registrar Usuario</button>
      </form>
    </div>
  );
};

export default CreateUser;
