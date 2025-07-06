// src/components/EditUser.jsx

import React, { useState, useEffect } from 'react';
import axios from '../utils/axios'; // Usa tu instancia con interceptor
import { useParams, useNavigate } from 'react-router-dom';
import './EditUser.css';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roleId, setRoleId] = useState(2); // Por defecto cliente
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/admin/users/${id}`);
        const user = res.data.user; // Asegúrate de ajustar si tu API devuelve distinto
        setName(user.name);
        setEmail(user.email);
        setRoleId(user.role_id);
      } catch (err) {
        console.error(err);
        setError('No autorizado o no se pudo cargar el usuario.');
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.put(`/admin/users/${id}`, {
        name,
        email,
        role_id: roleId,
      });

      setSuccess('Usuario actualizado correctamente ✅');
      setTimeout(() => navigate('/admin/dashboard'), 2000);
    } catch (err) {
      console.error(err);
      setError('Error al actualizar usuario.');
    }
  };

  return (
    <div className="edit-user-container">
      <h2>Editar Usuario</h2>
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

        <select value={roleId} onChange={(e) => setRoleId(parseInt(e.target.value))}>
          <option value={1}>Admin</option>
          <option value={2}>Cliente</option>
        </select>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditUser;
