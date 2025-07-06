// src/components/EditCategory.jsx
import React, { useState, useEffect } from 'react';
import axios from '../utils/axios'; // Usa tu interceptor con token
import { useNavigate, useParams } from 'react-router-dom';
import './EditCategory.css';

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`/categories`);
        const category = res.data.find((c) => c.id === parseInt(id));
        if (category) {
          setName(category.name);
        }
      } catch (err) {
        console.error(err);
        setError('❌ Error al cargar la categoría');
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('El nombre es obligatorio.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post(`/admin/categories/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('✅ Categoría actualizada con éxito');
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError('❌ Error al actualizar la categoría');
    }
  };

  return (
    <div className="edit-category-container">
      <h1>Editar Categoría</h1>
      <form
        onSubmit={handleSubmit}
        className="edit-category-form"
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

        {error && <p className="error">{error}</p>}

        <button type="submit">Actualizar Categoría</button>
      </form>
    </div>
  );
};

export default EditCategory;
