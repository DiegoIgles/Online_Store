// src/components/CreateCategory.jsx
import React, { useState } from 'react';
import axios from '../utils/axios'; // Usa tu instancia con interceptor
import { useNavigate } from 'react-router-dom';
import './CreateCategory.css';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('El nombre de la categoría es obligatorio.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('/admin/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('✅ Categoría creada con éxito');
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError('❌ Error al crear la categoría');
    }
  };

  return (
   <div className="create-category-container">
  <h1>Crear Categoría</h1>
  <form
    onSubmit={handleSubmit}
    className="create-category-form"
    encType="multipart/form-data"
  >
    <div>
      <label>Nombre:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
    </div>

    <div>
      <label>Imagen:</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
    </div>

    {error && <p>{error}</p>}

    <button type="submit">Crear Categoría</button>
  </form>
</div>

  );
};

export default CreateCategory;
