// src/components/CreateProduct.jsx

import React, { useState } from 'react';
import axios from '../utils/axios'; // Usa tu instancia con token
import { useNavigate } from 'react-router-dom';
import './CreateProduct.css';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    if (image1) formData.append('image1', image1);
    if (image2) formData.append('image2', image2);
    if (image3) formData.append('image3', image3);

    try {
      await axios.post('/admin/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess('Producto creado correctamente ✅');
      setTimeout(() => navigate('/admin/dashboard'), 2000);
    } catch (err) {
      console.error(err);
      setError('Error al crear producto.');
    }
  };

  return (
    <div className="create-product-container">
      <h2>Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />

        <label>Imagen 1:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage1(e.target.files[0])}
          required
        />

        <label>Imagen 2:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage2(e.target.files[0])}
        />

        <label>Imagen 3:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage3(e.target.files[0])}
        />

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
};

export default CreateProduct;
